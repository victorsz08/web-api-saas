"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRepository = void 0;
const exception_error_1 = require("../../package/exception-error/exception.error");
class SecurityRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new SecurityRepository(repository);
    }
    ;
    async save(userId, roleId) {
        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new exception_error_1.ExceptionError("Usuário não encontrado", 404);
        }
        ;
        const role = await this.repository.role.findUnique({ where: { id: roleId } });
        if (!role) {
            throw new exception_error_1.ExceptionError("Cargo não encontrado", 404);
        }
        ;
        await this.repository.userRoles.create({
            data: {
                role: {
                    connect: {
                        id: role.id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
        return;
    }
    ;
    async find(userId) {
        const user = await this.repository.user.findUnique({
            where: {
                id: userId
            },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        if (!user) {
            throw new exception_error_1.ExceptionError("Usuário não encontrado", 404);
        }
        ;
        return {
            user: {
                id: user.id,
                username: user.username,
                roles: user.userRoles.map((r) => {
                    return {
                        id: r.role.id,
                        name: r.role.name,
                        description: r.role.description
                    };
                })
            }
        };
    }
    ;
    async update(userId, roleId) {
        const userRole = await this.repository.userRoles.update({
            where: {
                userId: userId
            },
            data: {
                role: {
                    connect: {
                        id: roleId
                    }
                }
            }
        });
        if (!userRole) {
            throw new exception_error_1.ExceptionError("Security not found", 400);
        }
        ;
        return;
    }
    ;
}
exports.SecurityRepository = SecurityRepository;
;
