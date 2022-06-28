"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRoute = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.posRoute = (0, express_1.Router)();
exports.posRoute.post('/', controller_1.Controller.create)
    // .post('/login',Controller.login)
    // .patch('/',Controller.update)
    // .delete('/',Controller.deleteCustomer)
    .get('/stats', controller_1.Controller.stats);
//# sourceMappingURL=route.js.map