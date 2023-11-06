import Message from "./message.model";

export const CreateMessage = async function (fastify, options) {
  fastify.post("/message", async (request, reply) => {
    const message = new Message({
      text: request.body.message,
    });

    await message.save();
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "message created" });
  });
};

export const getAllMessages = async function (fastify, options) {
  fastify.get("/message", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    const allMessages = await Message.find({});
    if (!allMessages) throw { error: "No messages" };

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ allMessages });
  });
};

export const getLiveMessages = async function (fastify, options) {
  fastify.get("/live-message", { websocket: true }, (conn) => {
    conn.socket.on("message", async (messages) => {
      try {
        console.log(messages);
        const jsonMess = JSON.parse(messages);
        const message = new Message({
          text: jsonMess,
        });
        let saveMessage = await message.save();
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
  });
};
