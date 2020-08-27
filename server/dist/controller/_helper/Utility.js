"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseFormat_1 = require("../interfaces/common/ResponseFormat");
class Utility {
    /**
     * @function generateResponse
     * @description used to create custom response
     * @param statusCode
     * @param message
     * @param isSuccess
     * @param data
     */
    static generateResponse(statusCode, message, isSuccess, data) {
        let _responseFormat = new ResponseFormat_1.IResponseFormat();
        return _responseFormat = {
            statusCode,
            message,
            isSuccess,
            data
        };
    }
}
exports.default = Utility;
//# sourceMappingURL=Utility.js.map