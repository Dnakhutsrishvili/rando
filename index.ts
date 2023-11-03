import fastify from "fastify";

const server = fastify();
import userRoute from "./src/users/user.routes";
import indexRoutes from "./src/indexes/index.routes";
import chatRoomRoutes from "./src/chat-rooms/chatroom.routes";
import deleteRoutes from "./src/delete/delete.routes";

server.register(indexRoutes);

server.register(userRoute);
server.register(chatRoomRoutes);
server.register(deleteRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
