"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const routes_1 = require("./UserModule/routes");
const route_1 = require("./ProductModule/route");
const routes_2 = require("./CustomerModule/routes");
const route_2 = require("./POSModule/route");
exports.routes = (0, express_1.Router)();
exports.routes.use('/users', routes_1.userRoute);
exports.routes.use('/products', route_1.productRoute);
exports.routes.use('/customers', routes_2.customerRoute);
exports.routes.use('/pos', route_2.posRoute);
//# sourceMappingURL=routes.js.map