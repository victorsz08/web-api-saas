"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSecurityUsecase = void 0;
class SaveSecurityUsecase {
    constructor(securityGateway) {
        this.securityGateway = securityGateway;
    }
    ;
    static build(securityGateway) {
        return new SaveSecurityUsecase(securityGateway);
    }
    ;
    async execute(input) {
        const { userId, roleId } = input;
        await this.securityGateway.save(userId, roleId);
        return;
    }
    ;
}
exports.SaveSecurityUsecase = SaveSecurityUsecase;
;
