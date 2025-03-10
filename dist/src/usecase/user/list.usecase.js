"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserUsecase = void 0;
class ListUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    ;
    static build(userGateway) {
        return new ListUserUsecase(userGateway);
    }
    ;
    async execute({ search }) {
        const users = await this.userGateway.list(search);
        const output = this.present(users);
        return output;
    }
    ;
    present(users) {
        return {
            users: users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };
            })
        };
    }
    ;
}
exports.ListUserUsecase = ListUserUsecase;
;
