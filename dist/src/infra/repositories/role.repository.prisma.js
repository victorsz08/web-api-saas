"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const role_entity_1 = require("../../domain/entities/role.entity");
const exception_error_1 = require("../../package/exception-error/exception.error");
class RoleRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new RoleRepository(repository);
    }
    ;
    async save(role) {
        const { id, name, description, createdAt, updatedAt } = role;
        await this.repository.role.create({
            data: {
                id,
                name,
                description,
                createdAt,
                updatedAt
            }
        });
        return;
    }
    ;
    async find(id) {
        const role = await this.repository.role.findUnique({ where: { id } });
        if (!role) {
            throw new exception_error_1.ExceptionError("Cargo não encontrado com esse ID", 404);
        }
        ;
        return role_entity_1.RoleEntity.with({
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
        });
    }
    ;
    async list(search) {
        const roles = await this.repository.role.findMany({
            where: {
                ...(search && {
                    name: { contains: search, mode: "insensitive" }
                })
            }
        });
        if (roles.length === 0) {
            throw new exception_error_1.ExceptionError("Nenhum cargo encontrado", 404);
        }
        ;
        const roleList = roles.map((role) => {
            return role_entity_1.RoleEntity.with({
                id: role.id,
                name: role.name,
                description: role.description,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt
            });
        });
        return roleList;
    }
    ;
    async update(id, name, description) {
        await this.repository.role.update({
            where: { id },
            data: {
                name,
                description,
                updatedAt: new Date().toISOString()
            }
        });
        return;
    }
    ;
}
exports.RoleRepository = RoleRepository;
;
