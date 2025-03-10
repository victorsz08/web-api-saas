"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRespository = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const exception_error_1 = require("../../package/exception-error/exception.error");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../prisma/config/config");
class AuthRespository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new AuthRespository(repository);
    }
    ;
    async login(username, password) {
        const user = await this.repository.user.findUnique({ where: { username } });
        if (!user) {
            throw new exception_error_1.ExceptionError("username ou senha incorretos", 404);
        }
        ;
        const comparePassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!comparePassword) {
            throw new exception_error_1.ExceptionError("username ou senha incorretos", 404);
        }
        ;
        const payload = (0, jsonwebtoken_1.sign)({
            id: user.id
        }, config_1.jsonSecret.secret, { expiresIn: "1d" });
        return payload;
    }
    ;
    async session(token) {
        const [_bearer, accessToken] = token.split(" ");
        (0, jsonwebtoken_1.verify)(accessToken, config_1.jsonSecret.secret);
        const accessTokendecoded = (0, jsonwebtoken_1.decode)(accessToken);
        const user = await this.repository.user.findUnique({ where: { id: accessTokendecoded.id } });
        if (!user) {
            throw new exception_error_1.ExceptionError("Usuário não encontrado", 404);
        }
        return user_entity_1.UserEntity.with({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
    ;
}
exports.AuthRespository = AuthRespository;
;
