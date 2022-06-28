"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.productRoute = (0, express_1.Router)();
exports.productRoute.post('/', controller_1.Controller.create)
    // .post('/login',Controller.login)
    .patch('/', controller_1.Controller.update)
    .delete('/', controller_1.Controller.deleteProduct)
    .get('/', controller_1.Controller.getProducts);
//# sourceMappingURL=route.js.map