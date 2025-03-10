"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNoteUsecase = void 0;
class FindNoteUsecase {
    constructor(noteGateway) {
        this.noteGateway = noteGateway;
    }
    ;
    static build(noteGateway) {
        return new FindNoteUsecase(noteGateway);
    }
    ;
    async execute(input) {
        const { id } = input;
        const aNote = await this.noteGateway.find(id);
        const output = this.present(aNote);
        return output;
    }
    ;
    present(note) {
        return {
            id: note.id,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        };
    }
    ;
}
exports.FindNoteUsecase = FindNoteUsecase;
;
