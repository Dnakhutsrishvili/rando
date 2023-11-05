import { connect } from "mongoose";

function deleteRoutes(fastify, options, done) {
  fastify.delete("/room/:roomId", async (request, reply) => {
    // deleteController.deleteRoomById
    reply.send({});
  });

  fastify.delete("/message/:messageId", async (request, reply) => {
    //  deleteController.deleteMessageById
    reply.send({});
  });

  done();
}

export default deleteRoutes;
