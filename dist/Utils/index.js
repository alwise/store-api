"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printer = exports.sendFailedResponse = exports.sendSuccessResponse = void 0;
const ResponseUtils_1 = require("./ResponseUtils");
Object.defineProperty(exports, "sendSuccessResponse", { enumerable: true, get: function () { return ResponseUtils_1.sendSuccessResponse; } });
Object.defineProperty(exports, "sendFailedResponse", { enumerable: true, get: function () { return ResponseUtils_1.sendFailedResponse; } });
const printer_design_1 = __importDefault(require("./printer_design"));
exports.printer = printer_design_1.default;
//# sourceMappingURL=index.js.map