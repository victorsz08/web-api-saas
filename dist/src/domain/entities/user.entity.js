"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const uuid_1 = require("uuid");
class UserEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(username, firstName, lastName, password) {
        return new UserEntity({
            id: (0, uuid_1.v4)(),
            username,
            firstName,
            lastName,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new UserEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get username() {
        return this.props.username;
    }
    ;
    get firstName() {
        return this.props.firstName;
    }
    ;
    get lastName() {
        return this.props.lastName;
    }
    ;
    get password() {
        return this.props.password;
    }
    ;
    get createdAt() {
        return this.props.createdAt;
    }
    ;
    get updatedAt() {
        return this.props.updatedAt;
    }
    ;
}
exports.UserEntity = UserEntity;
;
