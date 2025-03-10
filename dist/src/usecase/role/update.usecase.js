"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleUsecase = void 0;
class UpdateRoleUsecase {
    constructor(roleGateway) {
        this.roleGateway = roleGateway;
    }
    ;
    static build(roleGateway) {
        return new UpdateRoleUsecase(roleGateway);
    }
    ;
    async execute(input) {
        const { id, name, description } = input;
        const aRole = await this.roleGateway.find(id);
        await this.roleGateway.update(id, name, description);
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
exports.UpdateRoleUsecase = UpdateRoleUsecase;
;
