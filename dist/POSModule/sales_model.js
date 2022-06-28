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
exports.Sales = void 0;
const database_1 = require("../Config/database");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const sales_item_model_1 = require("./sales_item_model");
class Sales extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        // createSalesItems = async (salesData) =>{
        // }
        this.getSales = (options) => __awaiter(this, void 0, void 0, function* () {
            return yield Sales.findAll({ where: Object.assign({}, options), include: [{ all: true }] });
        });
    }
    Sales() {
    }
}
exports.Sales = Sales;
Sales.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_1.UUIDV4 },
    reference: { type: sequelize_1.DataTypes.STRING(200) },
    soldBy: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    customerId: { type: sequelize_1.DataTypes.STRING(180), allowNull: false, defaultValue: 'unknown' },
    subTotal: { type: sequelize_1.DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    balance: { type: sequelize_1.DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    amountPaid: { type: sequelize_1.DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    isCredit: { type: sequelize_1.DataTypes.BOOLEAN(), allowNull: false, defaultValue: false },
    date: { type: sequelize_1.DataTypes.DATEONLY(), allowNull: false },
    yearMonth: { type: sequelize_1.DataTypes.STRING(20), allowNull: false, defaultValue: (0, moment_1.default)().format('YYYY-MM') },
}, { sequelize: database_1.sequelize, underscored: true });
Sales.hasMany(sales_item_model_1.SalesItem, { as: 'items', foreignKey: 'salesId', onDelete: "CASCADE" });
//# sourceMappingURL=sales_model.js.map