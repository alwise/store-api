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
const database_1 = require("../Config/database");
// import { printer } from '../Utils';
// import { User } from '../UserModule/model';
// import moment from 'moment';
const sales_model_1 = require("../POSModule/sales_model");
exports.Controller = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const customer = new model_1.Customer(body);
            const exists = yield customer.getCustomers({ phoneNumber: body === null || body === void 0 ? void 0 : body.phoneNumber });
            if ((exists === null || exists === void 0 ? void 0 : exists.length) > 0) {
                return res.send((0, Utils_1.sendFailedResponse)({
                    message: 'Phone number already used'
                }));
            }
            const result = yield customer.createCustomer();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customer created successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    pay: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            const body = req.body;
            yield model_1.Customer.decrement('balance', { by: parseFloat(`${(body === null || body === void 0 ? void 0 : body.paidAmount) || 0.0}`), where: { id: body === null || body === void 0 ? void 0 : body.customerId }, transaction });
            const now = Date.now();
            const payment = yield model_1.Payment.create(Object.assign(Object.assign({}, body), { reference: `${now}` }), { transaction });
            // const customer = await Customer.findByPk(body?.customerId, { transaction })
            // const seller = await User.findByPk(payment.paidTo, { transaction });
            transaction.commit();
            // await printer.printContent(printer.paymentPrintView({
            //     reference: payment.reference,
            //     customerName: customer?.name,
            //     seller: seller?.name,
            //     amountPaid: parseFloat(`${payment?.paidAmount || '0.0'}`).toFixed(2),
            //     previousBalance: parseFloat(`${payment?.previousAmount || '0.0'}`).toFixed(2),
            //     balance: parseFloat(`${customer?.balance || '0.0'}`).toFixed(2),
            //     date: moment(payment?.updatedAt).format('YYYY-MM-DD HH:mm')
            // }));
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Payment updated successfully', data: payment }));
        }
        catch (error) {
            transaction.rollback();
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const customer = new model_1.Customer(req.body);
            const result = yield customer.updateCustomer();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customer updated successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getCustomers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const customer = new model_1.Customer();
            const result = yield customer.getCustomers(JSON.parse(JSON.stringify(req.query || {})));
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customers retrieved successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getCustomer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const param = JSON.parse(JSON.stringify(req.query));
            const customerModel = new model_1.Customer();
            const customer = yield customerModel.getCustomer(param === null || param === void 0 ? void 0 : param.id);
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customer retrieved successfully', data: customer }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getCustomerHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const param = JSON.parse(JSON.stringify(req.query));
            const paymentHistory = yield model_1.Payment.findAll({
                where: { customerId: param === null || param === void 0 ? void 0 : param.customerId }, order: [['createdAt', "DESC"]], limit: 50,
            });
            const salesHistory = yield sales_model_1.Sales.findAll({
                where: { customerId: param === null || param === void 0 ? void 0 : param.customerId }, order: [['createdAt', "DESC"]],
                limit: 50,
                include: [{ all: true }]
            });
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customers history retrieved successfully', data: { payment: paymentHistory, purchases: salesHistory } }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    deleteCustomer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const customer = new model_1.Customer(req.body);
            const result = yield customer.deleteCustomer();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Customer deleted successfully', data: result }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    })
};
//# sourceMappingURL=controller.js.map