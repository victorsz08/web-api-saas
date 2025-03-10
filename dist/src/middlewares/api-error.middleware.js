"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = apiError;
function apiError(error, request, response, next) {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal server error";
    return response.status(statusCode).json({ status: statusCode, error: message }).send();
}
;
