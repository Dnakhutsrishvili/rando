import {
  createUser,
  getUser,
  connectUser,
  getConnectedUsers,
  deleteUser,
} from "./user.controller";

function userRoutes(fastify, options, done) {
  createUser(fastify, options);
  getUser(fastify, options);
  connectUser(fastify, options);
  getConnectedUsers(fastify, options);
  deleteUser(fastify, options);
  done();
}

export default userRoutes;
