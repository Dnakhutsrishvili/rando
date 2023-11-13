import "./src/connections/connection";
import fastify from "fastify";
import websocket from "@fastify/websocket";
import userRoute from "./src/users/user.routes";
import chatRoomRoutes from "./src/chat-rooms/chatroom.routes";
import messageRoutes from "./src/messages/message.routes";
import fastifyIO from "fastify-socket.io";
import cors from "@fastify/cors";

const server = fastify();
// server.register(fastifyIO);

// server.register(cors, {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// });
server.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});


server.ready().then(() => {
  //@ts-ignore
  const users = new Map();
  //@ts-ignore

server.io.on('connection', (socket) => {
  console.log('User connected');

  // Automatically assign a unique username
  const username = `User${Date.now()}`;
  users.set(socket.id, username);
  socket.emit('assignedUsername', username);

  console.log(users)
  // Handle one-on-one chat initiation
  socket.on('startChat', () => {

    
    let availableUsers = Array.from(users).filter(([id]) => id !== socket.id);
 


    console.log(availableUsers,"avaliable users")
    if (availableUsers.length > 0) {
      const [targetSocketId, targetUsername] = availableUsers[Math.floor(Math.random() * availableUsers.length)];
      const room = `${socket.id}-${targetSocketId}`;

      // Notify the users about the chat initiation
        //@ts-ignore
      server.io.to(socket.id).to(targetSocketId).emit('chatStarted', { room, targetUsername });

      // Join the unique room for the two users
      if (!socket.rooms[room]) {
        // not in the room
        socket.join(room);
        //@ts-ignore
        server.io.sockets.sockets.get(targetSocketId).join(room);
      } else {
        // in the room
        console.log("room occupied");
      }
        //@ts-ignore

      server.io.sockets.sockets.get(targetSocketId).join(room);
    } else {
      // Handle if there are no available users for chat
      socket.emit('noAvailableUsers');
    }
  });

  // Handle incoming private messages
  socket.on('privateMessage', ({ room, message }) => {
      //@ts-ignore

    server.io.to(room).emit('privateMessage', { sender: users.get(socket.id), message });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove user from the users map
    users.delete(socket.id);
  });
});
})
server.register(userRoute);
server.register(messageRoutes);
server.register(chatRoomRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
