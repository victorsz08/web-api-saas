"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSessionUsecase = void 0;
class AuthSessionUsecase {
    constructor(authGateway) {
        this.authGateway = authGateway;
    }
    ;
    static build(authGateway) {
        return new AuthSessionUsecase(authGateway);
    }
    ;
    async execute(input) {
        const { token } = input;
        const aUser = await this.authGateway.session(token);
        const output = this.present(aUser);
        return output;
    }
    ;
    present(user) {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    ;
}
exports.AuthSessionUsecase = AuthSessionUsecase;
;
