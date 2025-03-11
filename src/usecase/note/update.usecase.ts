import { NoteEntity } from "../../domain/entities/note.entity";
import { NoteGateway } from "../../domain/gateway/note.gateway";
import { Usecase } from "../usecase";


export type UpdateNoteInputDto = {
    id: string;
    content: string;
};

export type UpdateNoteOutputDto = {
    id: string;
};


export class UpdateNoteUsecase implements Usecase<UpdateNoteInputDto, UpdateNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new UpdateNoteUsecase(noteGateway);
    };
    
    public async execute(input: UpdateNoteInputDto): Promise<UpdateNoteOutputDto> {
        const { id, content } = input;
        const aNote = await this.noteGateway.find(id);
        
        await this.noteGateway.update(id, content);
        const output = this.present(aNote);

        return output;
    };

    private present(note: NoteEntity): UpdateNoteOutputDto {
        return {
            id: note.id
        };
    };
};