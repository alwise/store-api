"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
exports.sequelize = new sequelize_1.Sequelize(_1.Configs.database.DBB_URL(), Object.assign({}, _1.Configs.database.options));
//# sourceMappingURL=database.js.map