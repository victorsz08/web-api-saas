"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUsecase = void 0;
class UpdateUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    ;
    static build(userGateway) {
        return new UpdateUserUsecase(userGateway);
    }
    ;
    async execute({ id, username, firstName, lastName }) {
        const user = await this.userGateway.find(id);
        await this.userGateway.update(id, username, firstName, lastName);
        const output = this.present(user);
        return output;
    }
    ;
    present(user) {
        return {
            id: user.id
        };
    }
    ;
}
exports.UpdateUserUsecase = UpdateUserUsecase;
;
