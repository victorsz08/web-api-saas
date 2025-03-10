"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteUsecase = void 0;
class UpdateNoteUsecase {
    constructor(noteGateway) {
        this.noteGateway = noteGateway;
    }
    ;
    static build(noteGateway) {
        return new UpdateNoteUsecase(noteGateway);
    }
    ;
    async execute(input) {
        const { id, content } = input;
        const aNote = await this.noteGateway.find(id);
        await this.noteGateway.update(id, content);
        const output = this.present(aNote);
        return output;
    }
    ;
    present(note) {
        return {
            id: note.id
        };
    }
    ;
}
exports.UpdateNoteUsecase = UpdateNoteUsecase;
;
