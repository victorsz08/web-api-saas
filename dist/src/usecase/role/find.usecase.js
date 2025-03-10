"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRoleUsecase = void 0;
class FindRoleUsecase {
    constructor(roleGateway) {
        this.roleGateway = roleGateway;
    }
    ;
    static build(roleGateway) {
        return new FindRoleUsecase(roleGateway);
    }
    ;
    async execute(input) {
        const { id } = input;
        const aRole = await this.roleGateway.find(id);
        const output = this.present(aRole);
        return output;
    }
    ;
    present(role) {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
        };
    }
    ;
}
exports.FindRoleUsecase = FindRoleUsecase;
;
