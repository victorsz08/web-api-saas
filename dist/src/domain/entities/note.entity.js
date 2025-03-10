"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEntity = void 0;
const uuid_1 = require("uuid");
class NoteEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(content, userId) {
        return new NoteEntity({
            id: (0, uuid_1.v4)(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new NoteEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get content() {
        return this.props.content;
    }
    ;
    get userId() {
        return this.props.userId;
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
exports.NoteEntity = NoteEntity;
;
