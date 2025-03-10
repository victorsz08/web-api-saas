"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = void 0;
exports.accessControll = accessControll;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../prisma/config/config");
const prisma_1 = require("../package/prisma/prisma");
exports.RoleType = {
    ADMIN: "admin",
    USER: "user"
};
function accessControll(role) {
    return async (request, response, nextFunction) => {
        const token = request.headers.authorization;
        if (!token) {
            return response.status(401).json({ status: 401, error: "Unauthorized" }).send();
        }
        const [_bearer, accessToken] = token.split(" ");
        (0, jsonwebtoken_1.verify)(accessToken, config_1.jsonSecret.secret);
        const userDecoded = (0, jsonwebtoken_1.decode)(accessToken);
        const security = await prisma_1.prisma.userRoles.findUnique({
            where: {
                userId: userDecoded.id
            },
            include: {
                role: true
            }
        });
        if (!security) {
            return response.status(401).json({ status: 401, error: "Cargo não encontrado" }).send();
        }
        ;
        if (security.role.name !== role) {
            return response.status(401).json({ status: 401, error: "Seu cargo não permite acesso a esta rota" }).send();
        }
        ;
        nextFunction();
    };
}
;
