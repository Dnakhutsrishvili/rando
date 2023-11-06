import Message from "./message.model";

export const CreateMessage = async function (fastify, options) {
  fastify.get("/message", async (request, reply) => {
    const message = new Message({
      message: "new Message",
    });

    await message.save();
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "message created" });
  });
};
