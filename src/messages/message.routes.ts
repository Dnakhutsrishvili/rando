import {
  CreateMessage,
  getAllMessages,
  getLiveMessages,
} from "./message.controller";

function messageRoutes(fastify, options, done) {
  CreateMessage(fastify, options);
  getAllMessages(fastify, options);
  getLiveMessages(fastify, options);
  done();
}

export default messageRoutes;
