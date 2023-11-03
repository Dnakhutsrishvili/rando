"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("mongoose");
const user_modules_1 = require("./user.modules");
function userRoutes(fastify, options, done) {
    fastify.get("/", async (request, reply) => {
        (0, user_controller_1.default)().catch(err => console.log(err));
        console.log("user created");
    });
    fastify.get("/users", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const allUsers = await user_modules_1.default.find({});
        reply.send({ allUsers });
    });
    fastify.get("/users/:id", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const user = await user_modules_1.default.findOne({ _id: request.params.id });
        reply.send({ user });
    });
    fastify.patch("/users/connect/:id", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const user = await user_modules_1.default.findByIdAndUpdate({ _id: request.params.id }, { connected: true });
        reply.send({ message: "user connected" });
    });
    fastify.get("/connected", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const connectedUsers = await user_modules_1.default.find({ connected: true });
        reply.send({ connectedUsers });
    });
    fastify.delete("/users/:id", async (request, reply) => {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
        const user = await user_modules_1.default.findOneAndDelete({ _id: request.params.id });
        reply.send({ message: "User Deleted" });
    });
    done();
}
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map