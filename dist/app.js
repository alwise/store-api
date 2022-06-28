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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./Config/database");
const controllers_1 = require("./UserModule/controllers");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(express_1.default.json());
app.use('/v1', routes_1.routes);
const PORT = process.env.PORT || 3200;
database_1.sequelize.sync({ alter: true }).then((db) => {
    console.log('====================================');
    console.log('Database connected successfully ');
    console.log('====================================');
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('====================================');
        console.log('App started and running on port: ', PORT);
        console.log('====================================');
        yield controllers_1.Controller.initSuperAdmin();
    }));
}).catch((err) => {
    console.log('====================================');
    console.log('Database connection err due to: ', err === null || err === void 0 ? void 0 : err.message);
    console.log('====================================');
});
//# sourceMappingURL=app.js.map