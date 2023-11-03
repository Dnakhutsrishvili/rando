"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
function userRoutes(fastify, options, done) {
    fastify.get("/login", async (request, reply) => {
        (0, user_controller_1.default)().catch(err => console.log(err));
        console.log("login");
    });
    fastify.post("/chat", async (request, reply) => {
        console.log("user entered chat");
    });
    done();
}
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map