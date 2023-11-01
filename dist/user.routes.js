"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const server = (0, fastify_1.default)();
const user_controller_1 = require("./user.controller");
server.get("/login", async (request, reply) => {
    (0, user_controller_1.default)().catch(err => console.log(err));
    return "login";
});
//# sourceMappingURL=user.routes.js.map