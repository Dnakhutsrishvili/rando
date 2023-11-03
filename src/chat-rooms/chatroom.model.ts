import { Schema, model } from 'mongoose';


interface IChatRoom {
    userOne: string;
    userTwo: string;

  }
  
  const charRoomSchema = new Schema<IChatRoom>({
    userOne: { type: String, required: true },
    userTwo: { type: String, required: true },
  });
  
  const ChatRoom = model<IChatRoom>('chatroom', charRoomSchema);

  export default ChatRoom;