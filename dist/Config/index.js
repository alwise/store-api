"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = 'postgres';
exports.Configs = {
    database: {
        DB_URL_TEST: 'postgres://postgres:admin@localhost:5432/store',
        DB_URL_PRODUCTION: 'postgres://boltlinks06db:boltlinks06db@boltlinks06db.cvaap4iqjoqa.eu-west-1.rds.amazonaws.com:5432/store',
        DBB_URL: () => process.env.NODE_ENV === 'development' ? exports.Configs.database.DB_URL_TEST : exports.Configs.database.DB_URL_PRODUCTION,
        options: {
            dialect,
            dialectOptions: {
                decimalNumbers: true
                // ssl: {
                //     require: false, // This will help you. But you will see nwe error
                //     rejectUnauthorized: false // This line will fix new error
                //   }
            }
        }
    },
    keys: {
        secrete: process.env.secrete || 'no-secrete-found'
    }
};
//# sourceMappingURL=index.js.map