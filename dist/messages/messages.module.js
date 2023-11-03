"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: { type: String, required: true },
});
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.default = Message;
//# sourceMappingURL=messages.module.js.map