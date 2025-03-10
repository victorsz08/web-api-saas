"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoteUsecase = void 0;
class ListNoteUsecase {
    constructor(noteGateway) {
        this.noteGateway = noteGateway;
    }
    ;
    static build(noteGateway) {
        return new ListNoteUsecase(noteGateway);
    }
    ;
    async execute(query) {
        const aNotes = await this.noteGateway.list(query);
        const output = this.present(aNotes);
        return output;
    }
    ;
    present(data) {
        return {
            notes: data.notes.map((note) => {
                return {
                    id: note.id,
                    content: note.content,
                    userId: note.userId,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                };
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    }
    ;
}
exports.ListNoteUsecase = ListNoteUsecase;
;
