import { NoteEntity } from "../entities/note.entity";

export type QueryListNote = {
    userId: string;
    page: number;
    startDate?: Date;
    endDate?: Date;
};

export type ListNoteDto = {
    notes: NoteEntity[];
    totalItems: number;
    totalPages: number;
}

export interface NoteGateway  {
    save(data: NoteEntity): Promise<void>;
    list(query: QueryListNote): Promise<ListNoteDto>;
    find(id: string): Promise<NoteEntity>;
    update(id: string, content: string): Promise<void>;
};