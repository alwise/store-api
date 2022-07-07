"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.customerRoute = (0, express_1.Router)();
exports.customerRoute.post('/', controller_1.Controller.create)
    .post('/pay', controller_1.Controller.pay)
    .patch('/', controller_1.Controller.update)
    .delete('/', controller_1.Controller.deleteCustomer)
    .get('/', controller_1.Controller.getCustomers);
//# sourceMappingURL=routes.js.map