import { connect } from "mongoose";

function deleteRoutes(fastify, options, done) {
  fastify.delete("/room/:roomId", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    // deleteController.deleteRoomById
    reply.send({});
  });

  fastify.delete("/message/:messageId", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    //  deleteController.deleteMessageById
    reply.send({});
  });

  done();
}

export default deleteRoutes;
