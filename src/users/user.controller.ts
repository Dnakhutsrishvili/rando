import { faker } from "@faker-js/faker";
import User from "./user.model";

export const createUser = async function (fastify, options) {
  fastify.get("/createUser", async (request, reply) => {
    const user = new User({
      name: faker.animal.fish(),
      connected: false,
    });
    fastify.io.emit("connection", "this is message");

    await user.save();
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "user created" });
  });
};

export const getUser = async function (fastify, options) {
  fastify.get("/users/:id", async (request, reply) => {
    const user = await User.findOne({ _id: request.params.id });
    if (!user) throw { error: "No user with this id found" };

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ user });
  });
};

export const connectUser = async function (fastify, options) {
  fastify.patch("/users/connect/:id", async (request, reply) => {
    const user = await User.findByIdAndUpdate(
      { _id: request.params.id },
      { connected: true }
    );
    if (!user) throw { error: "No user with this id found" };

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "user connected" });
  });
};

export const getConnectedUsers = async function (fastify, options) {
  fastify.get("/connected", async (request, reply) => {
    const connectedUsers = await User.find({ connected: true });
    if (!connectedUsers) throw { error: "No connected user" };

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ connectedUsers });
  });
};

export const deleteUser = async function (fastify, options) {
  fastify.delete("/users/:id", async (request, reply) => {
    const user = await User.findOneAndDelete({ _id: request.params.id });
    if (!user) throw { error: "No user with this id found" };

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(204);
    reply.send({ message: "User Deleted" });
  });
};
