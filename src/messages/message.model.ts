import { Schema, model } from "mongoose";

interface IMessage {
  text: string;
  userId: string;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  userId: { type: String, required: true },
});

const Message = model<IMessage>("message", messageSchema);

export default Message;
