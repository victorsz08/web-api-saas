"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = void 0;
const uuid_1 = require("uuid");
class RoleEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(name, description) {
        return new RoleEntity({
            id: (0, uuid_1.v4)(),
            name,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new RoleEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get name() {
        return this.props.name;
    }
    ;
    get description() {
        return this.props.description;
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
exports.RoleEntity = RoleEntity;
;
