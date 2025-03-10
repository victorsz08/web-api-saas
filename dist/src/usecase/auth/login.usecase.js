"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginUsecase = void 0;
class AuthLoginUsecase {
    constructor(authGateway) {
        this.authGateway = authGateway;
    }
    ;
    static build(authGateway) {
        return new AuthLoginUsecase(authGateway);
    }
    ;
    async execute(input) {
        const { username, password } = input;
        const token = await this.authGateway.login(username, password);
        const output = this.present(token);
        return output;
    }
    ;
    present(token) {
        return {
            token: token
        };
    }
    ;
}
exports.AuthLoginUsecase = AuthLoginUsecase;
;
