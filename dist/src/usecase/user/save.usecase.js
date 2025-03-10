"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserUsecase = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
class SaveUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    ;
    static build(userGateway) {
        return new SaveUserUsecase(userGateway);
    }
    ;
    async execute({ username, firstName, lastName, password }) {
        const aUser = user_entity_1.UserEntity.build(username, firstName, lastName, password);
        await this.userGateway.save(aUser);
        const output = this.present(aUser);
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
exports.SaveUserUsecase = SaveUserUsecase;
;
