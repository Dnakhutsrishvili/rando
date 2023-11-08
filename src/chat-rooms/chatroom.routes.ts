import { chatRoom } from "./chatRoom.controller";

function chatRoomRoutes(fastify, options, done) {
  chatRoom(fastify, options);
  done();
}

export default chatRoomRoutes;
