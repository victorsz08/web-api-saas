import { ListNoteDto, NoteGateway } from "../../domain/gateway/note.gateway";
import { Usecase } from "../usecase";



export type ListNoteInputDto = {
    userId: string;
    page: number;
    startDate?: Date;
    endDate?: Date;
};

export type ListNoteOutputDto = {
    notes: {
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};


export class ListNoteUsecase implements Usecase<ListNoteInputDto, ListNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new ListNoteUsecase(noteGateway);
    };
    
    public async execute(query: ListNoteInputDto): Promise<ListNoteOutputDto> {
        const aNotes = await this.noteGateway.list(query);
        const output = this.present(aNotes);

        return output;
    };

    private present(data: ListNoteDto): ListNoteOutputDto {
        return {
            notes: data.notes.map((note) => {
                return {
                    id: note.id,
                    content: note.content,
                    userId: note.userId,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                }
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    };
};