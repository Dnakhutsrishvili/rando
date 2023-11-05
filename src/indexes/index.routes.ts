import { connect } from "mongoose";
import Index from "./index.model";

function indexRoutes(fastify, options, done) {
  fastify.get("/login/:userId", async (request, reply) => {
    const allMessages = await Index.find({});
    reply.send({ allMessages });
  });

  fastify.post("/messages", async (request, reply) => {
    const message = new Index({
      message: request.body.message,
    });

    await message.save();
  });

  done();
}

export default indexRoutes;
