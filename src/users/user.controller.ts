import { faker } from "@faker-js/faker";
import User from "./user.model";

export const createUser = async function (request, reply) {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET");
  const user = new User({
    name: faker.animal.fish(),
    connected: false,
  });

  await user.save();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ message: "user created", user });
};

export const getUser = async function (request, reply) {
  const user = await User.findOne({ _id: request.params.id });
  if (!user) throw { error: "No user with this id found" };

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ user });
};

export const deleteUser = async function (request, reply) {
  const user = await User.findOneAndDelete({ _id: request.params.id });
  if (!user) throw { error: "No user with this id found" };

  reply.code(204).header("Content-Type", "application/json; charset=utf-8");
  reply.send({ message: "User Deleted" });
};
