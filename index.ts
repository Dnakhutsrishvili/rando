import fastify from "fastify";
import "./src/connections/connection";
import { Server } from "socket.io";
import fastifyIO from "fastify-socket.io";

const server = fastify();
server.register(fastifyIO);
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

  server.ready().then(() => {
    // we need to wait for the server to be ready, else `server.io` is undefined
    //@ts-ignore
    server.io.on("connection", (socket) => {
      console.log("Connected");
      socket.on("message", (data) => {
        console.log("Received message:", data);
      });
    });
  });
  console.log(`Server listening at ${address}`);
});
