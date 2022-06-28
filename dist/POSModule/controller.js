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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const sales_item_model_1 = require("./sales_item_model");
const sales_model_1 = require("./sales_model");
const model_1 = require("../CustomerModule/model");
const Utils_1 = require("../Utils");
const database_1 = require("../Config/database");
const moment_1 = __importDefault(require("moment"));
exports.Controller = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            const body = req.body;
            const itemsCopy = body === null || body === void 0 ? void 0 : body.items;
            const items = [];
            /**
             * submit sales data
             */
            const ref = Date.now();
            const dateSold = (0, moment_1.default)().format('YYYY-MM-DD');
            const month = (0, moment_1.default)().format('YYYY-MM');
            const sales = yield sales_model_1.Sales.create({
                reference: `${ref}`,
                subTotal: parseFloat(parseFloat(`${(body === null || body === void 0 ? void 0 : body.subTotal) || 0.0}`).toFixed(2)),
                balance: parseFloat(parseFloat(`${((body === null || body === void 0 ? void 0 : body.subTotal) - (body === null || body === void 0 ? void 0 : body.amountPaid))}`).toFixed(2)),
                amountPaid: parseFloat(parseFloat(`${(body === null || body === void 0 ? void 0 : body.amountPaid) || 0.0}`).toFixed(2)),
                soldBy: body === null || body === void 0 ? void 0 : body.soldBy,
                customerId: (body === null || body === void 0 ? void 0 : body.customerId) || 'unknown',
                isCredit: (body === null || body === void 0 ? void 0 : body.customerId) === undefined ? false : true,
                date: dateSold,
                yearMonth: month
            }, { transaction });
            /**
             *  update customer balance
             */
            if ((sales === null || sales === void 0 ? void 0 : sales.isCredit) === true) {
                if ((sales === null || sales === void 0 ? void 0 : sales.balance) > 0) {
                    yield model_1.Customer.increment('balance', { by: sales === null || sales === void 0 ? void 0 : sales.balance,
                        where: { id: sales === null || sales === void 0 ? void 0 : sales.customerId }, transaction });
                }
            }
            /**
             * reformat and normalize items data
             */
            itemsCopy.forEach((val) => {
                items.push({
                    salesId: sales === null || sales === void 0 ? void 0 : sales.id,
                    quantity: parseInt(`${(val === null || val === void 0 ? void 0 : val.quantity) || 0}`),
                    price: parseFloat(parseFloat(`${(val === null || val === void 0 ? void 0 : val.price) || 0.0}`).toFixed(2)),
                    productName: val === null || val === void 0 ? void 0 : val.productName,
                    date: dateSold,
                });
            });
            /**
             * create sales items
             */
            const salesItems = yield sales_item_model_1.SalesItem.bulkCreate(items, { transaction });
            yield transaction.commit();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Sales created successfully', data: { salesItems, sales } }));
        }
        catch (error) {
            yield transaction.rollback();
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    stats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            const option = JSON.parse(JSON.stringify(req.query || {}));
            const totalAmount = yield sales_model_1.Sales.sum('subTotal', { where: Object.assign({}, option), transaction });
            const salesCount = yield sales_model_1.Sales.count({ col: 'id', where: Object.assign({}, option), transaction });
            yield transaction.commit();
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Sales data successfully', data: { totalAmount, salesCount } }));
        }
        catch (error) {
            yield transaction.rollback();
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    }),
    getSales: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const option = JSON.parse(JSON.stringify(req.query || {}));
            const pos = new sales_model_1.Sales();
            const data = yield pos.getSales(option);
            return res.send((0, Utils_1.sendSuccessResponse)({ message: 'Sales data retrieved successfully', data }));
        }
        catch (error) {
            return res.send((0, Utils_1.sendFailedResponse)({ error }));
        }
    })
};
//# sourceMappingURL=controller.js.map