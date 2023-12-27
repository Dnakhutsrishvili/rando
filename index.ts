import "./src/connections/connection";
import fastify from "fastify";
import fastifyIO from "fastify-socket.io";

const server = fastify();

server.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
server.ready().then(() => {
  const waitingList=[];
  const userRooms = new Map();
  //@ts-ignore
server.io.on('connection', (socket) => {
  socket.emit('assignedUsername', socket.id);
  waitingList.push(socket.id)
  socket.on('startChat', () => {
    socket.emit("clearChat")

    let availableUsers = waitingList.filter((user) => {return user !== socket.id});
  
    if (availableUsers.length > 0) {
      let targetSocketId=availableUsers[Math.floor(Math.random() * availableUsers.length)]
      let targetUsername=availableUsers[Math.floor(Math.random() * availableUsers.length)]

      const room = `${socket.id}-${targetSocketId}`;

      userRooms.set(socket.id, room);
      userRooms.set(targetSocketId, room);
          //@ts-ignore
      server.io.to(socket.id).to(targetSocketId).emit('chatStarted', { room, targetUsername });

      socket.on('typing', (data)=>{
        if(data.typing==true){
          //@ts-ignore
           socket.emit('display', data)
       } })
      if (!socket.rooms[room]) {
        socket.join(room);
        //@ts-ignore
        server.io.sockets.sockets.get(targetSocketId).join(room);
        waitingList.splice(waitingList.indexOf(socket.id), 1)
        waitingList.splice(waitingList.indexOf(targetSocketId), 1)

        socket.on("chatEnd",()=>{
          waitingList.push(socket.id)
          waitingList.push(targetSocketId)
        })
      } else {
        waitingList.push(socket.id)
        waitingList.push(targetSocketId)
      }
      //@ts-ignore
      server.io.sockets.sockets.get(targetSocketId).join(room);
    } else {
      socket.emit("clearChat")
      socket.emit('noAvailableUsers');
      waitingList.indexOf(socket.id) === -1 ? waitingList.push(socket.id) : console.log("This item already exists");
    }
  
  });
  socket.on('privateMessage', ({ room, message,time}) => {
  //@ts-ignore
    server.io.to(room).emit('privateMessage', { sender: socket.id, message ,time:time});
  });

  socket.on('disconnect', () => {
  const room = userRooms.get(socket.id);

  if (room) {
  //@ts-ignore
    server.io.to(room).emit('chatEnded');
    userRooms.delete(socket.id);
    socket.leave(room);
  }
  waitingList.splice(waitingList.indexOf(socket.id), 1);
});
});
})
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
