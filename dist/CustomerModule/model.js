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
exports.Customer = void 0;
const database_1 = require("../Config/database");
const sequelize_1 = require("sequelize");
class Customer extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.createCustomer = () => __awaiter(this, void 0, void 0, function* () {
            return yield Customer.create({
                name: this.name,
                phoneNumber: this.phoneNumber,
                balance: parseFloat(`${this.balance || 0.0}`)
            });
        });
        this.updateCustomer = () => __awaiter(this, void 0, void 0, function* () {
            return yield Customer.update({
                name: this.name,
                phoneNumber: this.phoneNumber,
                balance: parseFloat(`${this.balance || 0.0}`)
            }, { where: { id: this.id } });
        });
        this.deleteCustomer = () => __awaiter(this, void 0, void 0, function* () {
            return yield Customer.destroy({ where: { id: this.id } });
        });
        this.getCustomers = (options) => __awaiter(this, void 0, void 0, function* () {
            return yield Customer.findAll({ where: Object.assign({}, options), order: [['balance', 'DESC']] });
        });
    }
    Customer() {
    }
}
exports.Customer = Customer;
Customer.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_1.UUIDV4 },
    name: { type: sequelize_1.DataTypes.STRING(180) },
    balance: { type: sequelize_1.DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    phoneNumber: { type: sequelize_1.DataTypes.STRING(16), defaultValue: '0000000000' }
}, { sequelize: database_1.sequelize, underscored: true });
//# sourceMappingURL=model.js.map