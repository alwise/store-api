"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFailedResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (props) => {
    return {
        status: (props === null || props === void 0 ? void 0 : props.status) || true,
        statusCode: (props === null || props === void 0 ? void 0 : props.statusCode) || 200,
        data: (props === null || props === void 0 ? void 0 : props.data) || {},
        message: (props === null || props === void 0 ? void 0 : props.message) || 'Request completed successfully'
    };
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendFailedResponse = (props) => {
    var _a;
    return {
        status: (props === null || props === void 0 ? void 0 : props.status) || false,
        statusCode: (props === null || props === void 0 ? void 0 : props.statusCode) || 400,
        data: (props === null || props === void 0 ? void 0 : props.data) || {},
        message: (props === null || props === void 0 ? void 0 : props.message) || 'Unable to complete request',
        error: {
            error: props === null || props === void 0 ? void 0 : props.error,
            message: (_a = props === null || props === void 0 ? void 0 : props.error) === null || _a === void 0 ? void 0 : _a.message
        }
    };
};
exports.sendFailedResponse = sendFailedResponse;
//# sourceMappingURL=ResponseUtils.js.map