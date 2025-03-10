"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const exception_error_1 = require("../../package/exception-error/exception.error");
const bcryptjs_1 = require("bcryptjs");
const date_fns_1 = require("date-fns");
class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new UserRepository(repository);
    }
    ;
    async save({ id, username, firstName, lastName, password, createdAt, updatedAt }) {
        const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username } });
        if (usernameAlreadyExists) {
            throw new exception_error_1.ExceptionError("Username indisponível", 409);
        }
        ;
        const passwordHashed = await (0, bcryptjs_1.hash)(password, 10);
        const data = {
            id: id,
            username: username,
            name: firstName,
            lastname: lastName,
            password: passwordHashed,
            createdAt: (0, date_fns_1.startOfDay)(createdAt).toISOString(),
            updatedAt: (0, date_fns_1.startOfDay)(updatedAt).toISOString()
        };
        await this.repository.user.create({ data });
        return;
    }
    ;
    async find(id) {
        const user = await this.repository.user.findUnique({ where: { id } });
        if (!user) {
            throw new exception_error_1.ExceptionError("Usuário não encontrado", 404);
        }
        ;
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
    async list(search) {
        const users = await this.repository.user.findMany({
            where: {
                ...(search && {
                    OR: [
                        { username: { contains: search, mode: "insensitive" } },
                        { name: { contains: search, mode: "insensitive" } },
                        { lastname: { contains: search, mode: "insensitive" } }
                    ]
                })
            }
        });
        if (users.length === 0) {
            throw new exception_error_1.ExceptionError("Usuários não encontrados", 404);
        }
        ;
        const userList = users.map((user) => {
            return user_entity_1.UserEntity.with({
                id: user.id,
                username: user.username,
                firstName: user.name,
                lastName: user.lastname,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        });
        return userList;
    }
    ;
    async update(id, username, firstName, lastName) {
        const user = await this.find(id);
        if (user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username } });
            if (usernameAlreadyExists) {
                throw new exception_error_1.ExceptionError("Username indisponível", 409);
            }
            ;
        }
        ;
        const data = {
            name: firstName,
            lastname: lastName,
            updatedAt: (0, date_fns_1.startOfDay)(new Date()).toISOString()
        };
        await this.repository.user.update({
            where: { id },
            data
        });
        return;
    }
    ;
}
exports.UserRepository = UserRepository;
;
