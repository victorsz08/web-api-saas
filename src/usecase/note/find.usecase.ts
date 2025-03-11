import { NoteEntity } from "../../domain/entities/note.entity";
import { NoteGateway } from "../../domain/gateway/note.gateway";
import { Usecase } from "../usecase";


export type FindNoteInputDto = {
    id: string;
};

export type FindNoteOutputDto = {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindNoteUsecase implements Usecase<FindNoteInputDto, FindNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};
    
    public static build(noteGateway: NoteGateway) {
        return new FindNoteUsecase(noteGateway);
    };

    public async execute(input: FindNoteInputDto): Promise<FindNoteOutputDto> {
        const { id } = input;
        const aNote = await this.noteGateway.find(id);
        const output = this.present(aNote);

        return output;
    };

    private present(note: NoteEntity): FindNoteOutputDto {
        return {
            id: note.id,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        };
    };
};