"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messages_module_1 = require("./messages.module");
function messagesRoutes(fastify, options, done) {
    fastify.get("/messages", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const allMessages = await messages_module_1.default.find({});
        reply.send({ allMessages });
    });
    fastify.post("/messages", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const message = new messages_module_1.default({
            message: request.body.message,
        });
        await message.save();
    });
    done();
}
exports.default = messagesRoutes;
//# sourceMappingURL=messages.routes.js.map