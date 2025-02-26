import { NoteEntity } from "../../domain/entities/note.entity";
import { NoteGateway } from "../../domain/gateway/note.gateway";
import { Usecase } from "../usecase";

export type SaveNoteInputDto = {
    content: string;
    userId: string;
};

export type SaveNoteOutputDto = {
    id: string;
};

export class SaveNoteUsecase implements Usecase<SaveNoteInputDto, SaveNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};
    
    public static build(noteGateway: NoteGateway) {
        return new SaveNoteUsecase(noteGateway);
    };

    public async execute(input: SaveNoteInputDto): Promise<SaveNoteOutputDto> {
        const { content, userId } = input;
        const aNote = NoteEntity.build(content, userId);

        await this.noteGateway.save(aNote);
        const output = this.present(aNote);

        return output;
    };

    private present(note: NoteEntity): SaveNoteOutputDto {
        return {
            id: note.id
        };
    };
};