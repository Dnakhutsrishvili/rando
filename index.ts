import "./src/connections/connection";
import fastify from "fastify";
import websocket from "@fastify/websocket";
import userRoute from "./src/users/user.routes";
import indexRoutes from "./src/indexes/index.routes";
import chatRoomRoutes from "./src/chat-rooms/chatroom.routes";
import deleteRoutes from "./src/delete/delete.routes";
import messageRoutes from "./src/messages/message.routes";

const server = fastify();

function handle(conn, req) {
  conn.pipe(conn); // creates an echo server
}

// server.register(cors, {
//   hook: "preHandler",
// });
//@ts-ignore

server.register(websocket, {
  handle,
  options: { maxPayload: 1048576, clientTracking: true },
});

server.register(indexRoutes);
server.register(userRoute);
server.register(messageRoutes);
server.register(chatRoomRoutes);
server.register(deleteRoutes);

// server.register(async function () {
//   server.route({
//     method: "GET",
//     url: "/chats",
//     handler: (req, reply) => {
//       // this will handle http requests
//       reply.send({ hello: "world" });
//     },
//     wsHandler: (conn, req) => {
//       // this will handle websockets connections
//       conn.setEncoding("utf8");
//       conn.write("hello client");

//       conn.once("data", (chunk) => {
//         conn.end();
//       });
//     },
//   });
// });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
