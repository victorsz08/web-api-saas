"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindSecurityUsecase = void 0;
class FindSecurityUsecase {
    constructor(securityGateway) {
        this.securityGateway = securityGateway;
    }
    ;
    static build(securityGateway) {
        return new FindSecurityUsecase(securityGateway);
    }
    ;
    async execute(input) {
        const { userId } = input;
        const aSecurity = await this.securityGateway.find(userId);
        const output = this.present(aSecurity);
        return output;
    }
    ;
    present(security) {
        return {
            user: {
                id: security.user.id,
                username: security.user.username,
                roles: security.user.roles.map((role) => {
                    return {
                        id: role.id,
                        name: role.name,
                        description: role.description
                    };
                })
            }
        };
    }
    ;
}
exports.FindSecurityUsecase = FindSecurityUsecase;
;
