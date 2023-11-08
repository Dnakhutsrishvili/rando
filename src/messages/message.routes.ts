import {
  CreateMessage,
  getAllMessages,
  getLiveMessages,
} from "./message.controller";

function messageRoutes(fastify, options, done) {
  fastify.post("/message", CreateMessage);
  fastify.get("/message", getAllMessages);
  getLiveMessages(fastify, options);
  done();
}

export default messageRoutes;
