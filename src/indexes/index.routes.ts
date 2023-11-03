import { connect } from "mongoose";
import Index from "./index.module";

function indexRoutes(fastify, options, done) {
  fastify.get("/login/:userId", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const allMessages = await Index.find({});
    reply.send({ allMessages });
  });

  fastify.post("/messages", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");

    const message = new Index({
      message: request.body.message,
    });

    await message.save();
  });

  done();
}

export default indexRoutes;
