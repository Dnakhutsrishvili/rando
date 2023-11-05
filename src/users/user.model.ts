import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  connected: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  connected: { type: Boolean, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
