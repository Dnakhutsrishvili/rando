import { Schema, model } from "mongoose";

interface IMessage {
  text: string;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
});

const Message = model<IMessage>("message", messageSchema);

export default Message;
