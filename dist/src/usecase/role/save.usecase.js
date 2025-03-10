"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveRoleUsecase = void 0;
const role_entity_1 = require("../../domain/entities/role.entity");
class SaveRoleUsecase {
    constructor(roleGateway) {
        this.roleGateway = roleGateway;
    }
    ;
    static build(roleGateway) {
        return new SaveRoleUsecase(roleGateway);
    }
    ;
    async execute(input) {
        const { name, description } = input;
        const aRole = role_entity_1.RoleEntity.build(name, description);
        await this.roleGateway.save(aRole);
        const output = this.present(aRole);
        return output;
    }
    ;
    present(role) {
        return {
            id: role.id
        };
    }
    ;
}
exports.SaveRoleUsecase = SaveRoleUsecase;
;
