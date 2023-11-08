import Message from "./message.model";

export const CreateMessage = async function (request, reply) {
  const message = new Message({
    text: request.body.message,
    userId: "233",
  });
  await message.save();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ message: "message created" });
};

export const getAllMessages = async function (request, reply) {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET");
  const allMessages = await Message.find({});
  if (!allMessages) throw { error: "No messages" };
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ allMessages });
};

export const getLiveMessages = async function (fastify, options) {
  fastify.get(
    "/live-message/:id",
    { websocket: true },
    (conn, request, reply) => {
      reply.header("Access-Control-Allow-Origin", "*");
      reply.header("Access-Control-Allow-Methods", "GET");
      conn.socket.on("message", async (messages) => {
        try {
          const jsonMess = JSON.parse(messages);
          const message = new Message({
            text: jsonMess,
            userId: request.params.id,
          });
          let saveMessage = await message.save();
          // console.log(fastify.websocketServer.clients.size);
          fastify.websocketServer.clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(JSON.stringify(saveMessage));
            }
          });
        } catch (err) {
          console.log(err);
          conn.socket.send("errors");
        }
      });
    }
  );
};
