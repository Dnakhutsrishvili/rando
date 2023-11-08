import { createUser, getUser, deleteUser } from "./user.controller";

function userRoutes(fastify, options, done) {
  fastify.get("/user", createUser);
  fastify.get("/user/:id", getUser);
  fastify.delete("/user/:id", deleteUser);
  done();
}

export default userRoutes;
