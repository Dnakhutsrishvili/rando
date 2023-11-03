import { connect } from "mongoose";

// .get('/', chatRoom.getRecentConversation)
// .get('/:roomId', chatRoom.getConversationByRoomId)
// .post('/initiate', chatRoom.initiate)
// .post('/:roomId/message', chatRoom.postMessage)
// .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

function chatRoomRoutes(fastify, options, done) {
  fastify.get("/chat", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    //chatRoom.getRecentConversation
    reply.send({});
  });

  fastify.get("/:roomId", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    //chatRoom.getConversationByRoomId
    reply.send({});
  });

  fastify.post("/initiate", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    // .post('/initiate', chatRoom.initiate)

    reply.send({});
  });

  fastify.post("/:roomId/message", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    // .post('/:roomId/message', chatRoom.postMessage)

    reply.send({});
  });

  done();
}

export default chatRoomRoutes;
