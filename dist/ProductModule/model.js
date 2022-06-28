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
exports.Product = void 0;
const database_1 = require("../Config/database");
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.createProduct = () => __awaiter(this, void 0, void 0, function* () {
            return yield Product.create({
                productName: this.productName,
                price: parseFloat(`${this.price || 0.0}`),
                quantity: parseInt(`${this.quantity || 0}`)
            });
        });
        this.updateProduct = () => __awaiter(this, void 0, void 0, function* () {
            return yield Product.update(this, { where: { id: this.id } });
        });
        this.deleteProduct = () => __awaiter(this, void 0, void 0, function* () {
            return yield Product.destroy({ where: { id: this.id } });
        });
        this.getProducts = (options) => __awaiter(this, void 0, void 0, function* () {
            return yield Product.findAll({ where: Object.assign({}, options) });
        });
    }
    Product() {
    }
}
exports.Product = Product;
Product.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_1.UUIDV4 },
    productName: { type: sequelize_1.DataTypes.STRING(180) },
    price: { type: sequelize_1.DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    quantity: { type: sequelize_1.DataTypes.INTEGER(), allowNull: false, defaultValue: 0 }
}, { sequelize: database_1.sequelize, underscored: true });
//# sourceMappingURL=model.js.map