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
    initSuperAdmin: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('====================================');
            console.log('Checking for super admin');
            console.log('====================================');
            const body = {
                name: 'admin',
                phoneNumber: '0247417122',
                password: process.env.password,
                role: 'admin'
            };
            const user = new model_1.User(body);
            const exists = yield user.getUsers({ phoneNumber: body === null || body === void 0 ? void 0 : body.phoneNumber });
            if ((exists === null || exists === void 0 ? void 0 : exists.length) > 0) {
                console.log('====================================');
                console.log('Super admin data exists already, cleaning up');
                console.log('====================================');
                return;
            }
            yield user.createUser();
            console.log('====================================');
            console.log('Super admin created successfully');
            console.log('====================================');
            return;
        }
        catch (error) {
            console.log('====================================');
            console.log('unable to create supper admin due to: ', error === null || error === void 0 ? void 0 : error.message);
            console.log('====================================');
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = new model_1.User(body);
            const exists = yield user.getUsers({ phoneNumber: body === null || body === void 0 ? void 0 : body.phoneNumber });
            if ((exists === null || exists === void 0 ? void 0 : exists.length) > 0) {
                return res.send((0, Utils_1.sendFailedResponse)({
                    message: 'Phone number already used'
                }));
            }
            const result = yield user.createUser();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'User created successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = new model_1.User(req.body);
            const result = yield user.login();
            if (result === undefined) {
                return res.send((0, Utils_1.sendFailedResponse)({ message: 'Wrong username or password' }));
            }
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'User login successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new model_1.User(req.body);
            const result = yield user.updateUser();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'User updated successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new model_1.User();
            const result = yield user.getUsers(JSON.parse(JSON.stringify(req.query || {})));
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Users retrieved successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new model_1.User(req.body);
            const result = yield user.deleteUser();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'User deleted successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    })
};
//# sourceMappingURL=controllers.js.map