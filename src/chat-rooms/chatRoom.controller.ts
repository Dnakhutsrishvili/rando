import ChatRoom from "./chatroom.model";

export const chatRoom = async function (fastify, options) {
  fastify.get("/chat-room", { websocket: true }, (conn, request) => {
    conn.socket.on("connect", async (connection) => {
      try {
        // const jsonMess = JSON.parse(messages);
        const chatRoom = new ChatRoom({
          state: fastify.websocketServer.clients.size,
        });
        connection.socket.send(connection);

        // let saveMessage = await message.save();
        // fastify.websocketServer.clients.forEach((client) => {
        //   if (client.readyState === 1) {
        //     client.send(JSON.stringify(saveMessage));
        //   }
        // });
      } catch (err) {
        console.log(err);
        conn.socket.send("errors");
      }
    });
  });
};
