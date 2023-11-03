import { connect } from "mongoose";
import User from "./user.modules";
import { createUser } from "./user.controller";

// .get('/', user.onGetAllUsers)
// .post('/', user.onCreateUser)
// .get('/:id', user.onGetUserById)
// .delete('/:id', user.onDeleteUserById)

function userRoutes(fastify, options, done) {
  fastify.get("/getUsers", async (request, reply) => {
    createUser().catch((err) => console.log(err));
    console.log("user created");
  });

  fastify.get("/users", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const allUsers = await User.find({});
    reply.send({ allUsers });
  });

  fastify.get("/users/:id", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const user = await User.findOne({ _id: request.params.id });
    reply.send({ user });
  });

  fastify.patch("/users/connect/:id", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const user = await User.findByIdAndUpdate(
      { _id: request.params.id },
      { connected: true }
    );
    reply.send({ message: "user connected" });
  });

  fastify.get("/connected", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const connectedUsers = await User.find({ connected: true });
    reply.send({ connectedUsers });
  });

  fastify.delete("/users/:id", async (request, reply) => {
    await connect("mongodb://127.0.0.1:27017/chat");
    const user = await User.findOneAndDelete({ _id: request.params.id });
    reply.send({ message: "User Deleted" });
  });

  done();
}

export default userRoutes;
