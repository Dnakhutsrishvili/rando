"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = require("mongoose");
const user_modules_1 = require("./user.modules");
async function run() {
    await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/chat');
    const user = new user_modules_1.default({
        name: faker_1.faker.animal.fish(),
    });
    await user.save();
    console.log(user.name);
}
exports.default = run;
//# sourceMappingURL=user.controller.js.map