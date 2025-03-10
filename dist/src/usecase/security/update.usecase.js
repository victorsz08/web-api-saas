"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSecurityUsecase = void 0;
class UpdateSecurityUsecase {
    constructor(securityGateway) {
        this.securityGateway = securityGateway;
    }
    ;
    static build(securityGateway) {
        return new UpdateSecurityUsecase(securityGateway);
    }
    ;
    async execute(input) {
        const { userId, roleId } = input;
        await this.securityGateway.update(userId, roleId);
        return;
    }
    ;
}
exports.UpdateSecurityUsecase = UpdateSecurityUsecase;
;
