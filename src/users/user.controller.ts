import { faker } from "@faker-js/faker";
import { connect } from "mongoose";
import User from "./user.modules";

export async function createUser() {
  await connect("mongodb://127.0.0.1:27017/chat");

  const user = new User({
    name: faker.animal.fish(),
    connected: false,
  });
  await user.save();

  console.log(user.name); // 'bill@initech.com'
}

export async function getAll() {
  await connect("mongodb://127.0.0.1:27017/chat");

  const user = new User({
    name: faker.animal.fish(),
    connected: false,
  });
  await user.save();

  console.log(user.name); // 'bill@initech.com'
}
