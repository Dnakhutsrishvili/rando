"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const server = (0, fastify_1.default)();
const user_routes_1 = require("./users/user.routes");
const messages_routes_1 = require("./messages/messages.routes");
server.register(user_routes_1.default);
server.register(messages_routes_1.default);
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map