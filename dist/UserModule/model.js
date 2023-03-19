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
exports.User = void 0;
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../Config/index");
const sequelize_2 = require("sequelize");
const database_1 = require("../Config/database");
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.encodePassword = (pass) => __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hashSync(pass, 10);
            return hash;
        });
        this.decodePassword = (pass, passwordHash) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compareSync(pass, passwordHash);
        });
        this.tokenizer = (data) => {
            return jsonwebtoken_1.default.sign({
                id: data === null || data === void 0 ? void 0 : data.id,
                phoneNumber: data === null || data === void 0 ? void 0 : data.phoneNumber,
                role: data === null || data === void 0 ? void 0 : data.role,
            }, index_1.Configs.keys.secrete, { expiresIn: "10yr" });
        };
        this.userResponseData = (user) => __awaiter(this, void 0, void 0, function* () {
            return {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: user === null || user === void 0 ? void 0 : user.name,
                phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
                role: user === null || user === void 0 ? void 0 : user.role,
                token: this.tokenizer(user)
            };
        });
        this.createUser = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield User.create({
                name: this.name,
                phoneNumber: this.phoneNumber,
                password: yield this.encodePassword(this.password),
                role: this.role,
            });
            return this.userResponseData(result.toJSON());
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            console.log('====================================');
            console.log(this.phoneNumber);
            console.log('====================================');
            const useExist = yield User.findOne({
                where: { phoneNumber: this.phoneNumber }
            });
            if ((useExist === null || useExist === void 0 ? void 0 : useExist.id) && this.decodePassword(this.password, useExist === null || useExist === void 0 ? void 0 : useExist.password)) {
                return this.userResponseData(useExist.toJSON());
            }
            return undefined;
        });
        this.updateUser = () => __awaiter(this, void 0, void 0, function* () {
            return yield User.update({
                phoneNumber: this.phoneNumber,
                name: this.name,
                role: this.role,
            }, { where: { id: this.id } });
        });
        this.deleteUser = () => __awaiter(this, void 0, void 0, function* () {
            return yield User.destroy({ where: { id: this.id }, force: false });
        });
        this.getUsers = (options) => {
            return User.findAll({ where: Object.assign({}, options), paranoid: true });
        };
        this.getUser = (id) => {
            return User.findOne({ where: { id: id }, paranoid: true });
        };
    }
    User() {
        // this.id = user?.id;
        // this.name = user?.name;
        // this.phoneNumber = user?.phoneNumber;
        // this.password = user?.password;
        // this.role = user?.role;
        console.log('====================================');
        console.log('User model class initialized');
        console.log('====================================');
    }
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_2.UUIDV4 },
    name: { type: sequelize_1.DataTypes.STRING(180), allowNull: false },
    phoneNumber: { type: sequelize_1.DataTypes.STRING(12) },
    password: { type: sequelize_1.DataTypes.STRING(180), allowNull: false },
    role: { type: sequelize_1.DataTypes.STRING(12) }
}, { sequelize: database_1.sequelize, underscored: true, paranoid: true });
//# sourceMappingURL=model.js.map