"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function messagesRoutes(fastify, options, done) {
    fastify.post("/chatroom", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        reply.send({});
    });
    done();
}
exports.default = messagesRoutes;
//# sourceMappingURL=chatroom.routes.js.map