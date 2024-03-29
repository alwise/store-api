"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRoute = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.posRoute = (0, express_1.Router)();
exports.posRoute.post('/', controller_1.Controller.create)
    .post('/print', controller_1.Controller.printSalesReceipt)
    // .patch('/',Controller.update)
    // .delete('/',Controller.deleteCustomer)
    .get('/stats', controller_1.Controller.stats)
    .get('/', controller_1.Controller.getSales);
//# sourceMappingURL=route.js.map