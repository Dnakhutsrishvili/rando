import { Schema, model } from "mongoose";

interface IChatRoom {
  state: string;
}

const charRoomSchema = new Schema<IChatRoom>({
  state: { type: String, required: true },
});

const ChatRoom = model<IChatRoom>("chatroom", charRoomSchema);

export default ChatRoom;
