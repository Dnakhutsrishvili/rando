"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const charRoomSchema = new mongoose_1.Schema({
    userOne: { type: String, required: true },
    userTwo: { type: String, required: true },
});
const ChatRoom = (0, mongoose_1.model)('chatroom', charRoomSchema);
exports.default = ChatRoom;
//# sourceMappingURL=chatroom.module.js.map