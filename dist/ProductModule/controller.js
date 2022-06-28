"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const model_1 = require("./model");
const Utils_1 = require("../Utils");
exports.Controller = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const product = new model_1.Product(body);
            const exists = yield product.getProducts({ productName: body === null || body === void 0 ? void 0 : body.productName });
            if ((exists === null || exists === void 0 ? void 0 : exists.length) > 0) {
                return res.send((0, Utils_1.sendFailedResponse)({
                    message: 'This product already exist'
                }));
            }
            const result = yield product.createProduct();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Product created successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = new model_1.Product(req.body);
            const result = yield product.updateProduct();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Product updated successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = new model_1.Product();
            const result = yield product.getProducts(JSON.parse(JSON.stringify(req.query || {})));
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Products retrieved successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = new model_1.Product(req.body);
            const result = yield product.deleteProduct();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Product deleted successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    })
};
//# sourceMappingURL=controller.js.map