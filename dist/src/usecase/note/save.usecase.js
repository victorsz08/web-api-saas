"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveNoteUsecase = void 0;
const note_entity_1 = require("../../domain/entities/note.entity");
class SaveNoteUsecase {
    constructor(noteGateway) {
        this.noteGateway = noteGateway;
    }
    ;
    static build(noteGateway) {
        return new SaveNoteUsecase(noteGateway);
    }
    ;
    async execute(input) {
        const { content, userId } = input;
        const aNote = note_entity_1.NoteEntity.build(content, userId);
        await this.noteGateway.save(aNote);
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
exports.SaveNoteUsecase = SaveNoteUsecase;
;
