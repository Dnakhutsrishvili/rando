import "./src/connections/connection";
import fastify from "fastify";
import websocket from "@fastify/websocket";
import userRoute from "./src/users/user.routes";
import chatRoomRoutes from "./src/chat-rooms/chatroom.routes";
import messageRoutes from "./src/messages/message.routes";
import fastifyIO from "fastify-socket.io";
import cors from "@fastify/cors";

const server = fastify();
// server.register(fastifyIO);

// server.register(cors, {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// });
server.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

server.get("/", (req, reply) => {
  // reply.header("Access-Control-Allow-Origin", "*");
  // reply.header("Access-Control-Allow-Methods", "GET");
  //@ts-ignore
  server.io.emit("hello");
});
//@ts-ignore

server.ready().then(() => {
  //@ts-ignore
  server.io.on("connection", async (socket) => {
    // const username = socket.handshake.auth.username;

    const users = [];
    //@ts-ignore
    for (let [id, socket] of server.io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
        messages: [],
      });
      //@ts-ignore

      console.log(users);
    }

    var splitPairs = function (arr) {
      var pairs = [];
      for (var i = 0; i < arr.length; i += 2) {
        if (arr[i + 1] !== undefined) {
          pairs.push([arr[i], arr[i + 1]]);
        } else {
          pairs.push([arr[i]]);
        }
      }
      return pairs;
    };

    socket.emit("users", splitPairs(users));
    console.log("client connected");
  });
  //@ts-ignore
  server.io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });
  //@ts-ignore
  server.io.on("private message", ({ content, to }) => {
    console.log(content);
    console.log(to);

    //@ts-ignore
    server.io.to(to).emit("private message", {
      content,
      //@ts-ignore
      from: server.io.id,
    });
  });
});

// function handle(conn, req) {
//   conn.pipe(conn); // creates an echo server
// }
// server.register(cors, {
//   hook: "preHandler",
// });
//@ts-ignore
// server.register(websocket, {
//   handle,
//   options: { maxPayload: 1048576, clientTracking: true },
// });
server.register(userRoute);
server.register(messageRoutes);
server.register(chatRoomRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
