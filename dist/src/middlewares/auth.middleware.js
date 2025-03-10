"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../prisma/config/config");
function auth() {
    return async (request, response, nextFunction) => {
        const token = request.headers.authorization;
        if (!token) {
            return response.status(401).json({ status: 401, error: "Token não encontrado" }).send();
        }
        ;
        const [_bearer, accessToken] = token.split(" ");
        try {
            (0, jsonwebtoken_1.verify)(accessToken, config_1.jsonSecret.secret);
            nextFunction();
        }
        catch (error) {
            return response.status(401).json({ status: 401, error: "Usuário não autorizado" }).send();
        }
        ;
    };
}
;
