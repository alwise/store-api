"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post('/', controllers_1.Controller.create)
    .post('/login', controllers_1.Controller.login)
    .patch('/', controllers_1.Controller.update)
    .delete('/', controllers_1.Controller.deleteUser)
    .get('/find-by-id/:id', controllers_1.Controller.getUserById)
    .get('/', controllers_1.Controller.getUsers);
//# sourceMappingURL=routes.js.map