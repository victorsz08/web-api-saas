"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionError = void 0;
class ExceptionError extends Error {
    constructor(message, statusCode) {
        super(message),
            this.statusCode = statusCode;
    }
    ;
}
exports.ExceptionError = ExceptionError;
;
