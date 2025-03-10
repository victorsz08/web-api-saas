"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUsecase = void 0;
class FindUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    ;
    static build(userGateway) {
        return new FindUserUsecase(userGateway);
    }
    ;
    async execute({ id }) {
        const user = await this.userGateway.find(id);
        const output = this.present(user);
        return output;
    }
    ;
    present(user) {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    ;
}
exports.FindUserUsecase = FindUserUsecase;
;
