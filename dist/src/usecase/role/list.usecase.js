"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRoleUsecase = void 0;
class ListRoleUsecase {
    constructor(roleGateway) {
        this.roleGateway = roleGateway;
    }
    ;
    static build(roleGateway) {
        return new ListRoleUsecase(roleGateway);
    }
    ;
    async execute(input) {
        const { search } = input;
        const aRoles = await this.roleGateway.list(search);
        const output = this.present(aRoles);
        return output;
    }
    ;
    present(roles) {
        return {
            roles: roles.map((r) => {
                return {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    createdAt: r.createdAt,
                    updatedAt: r.updatedAt
                };
            })
        };
    }
}
exports.ListRoleUsecase = ListRoleUsecase;
;
