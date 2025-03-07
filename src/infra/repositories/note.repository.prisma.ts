import { Prisma, PrismaClient } from "@prisma/client";
import { NoteEntity } from "../../domain/entities/note.entity";
import { ListNoteDto, NoteGateway, QueryListNote } from "../../domain/gateway/note.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";
import { endOfDay, startOfDay } from "date-fns";



export class NoteRepository implements NoteGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new NoteRepository(repository);
    };

    public async save(data: NoteEntity): Promise<void> {
        const { id, content, userId, createdAt, updatedAt } = data;
        const user = await this.repository.user.findUnique({ where: { id: userId }});

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

        await this.repository.notes.create({
            data: {
                id: id,
                text: content,
                User: { connect: { id: userId }},
                createdAt: startOfDay(createdAt).toISOString(),
                updatedAt: startOfDay(updatedAt).toISOString()
            }
        });

        return;
    };


    public async list(query: QueryListNote): Promise<ListNoteDto> {
        const { userId, page, endDate, startDate } = query;

        const countArgs: Prisma.NotesCountArgs = {
            where: {
                User: {
                    id: userId
                }
            }
        };
        const queryArgs: Prisma.NotesFindManyArgs = {
            where: {
                User: {
                    id: userId
                }
            },
            take: 10,
            skip: page > 1 ? (page - 1) * 10 : 0
        };

        if(startDate && endDate) {
            queryArgs.where!.createdAt = {
                gte: startOfDay(startDate).toISOString(),
                lte: endOfDay(endDate).toISOString()
            };
            countArgs.where!.createdAt = {
                gte: startOfDay(startDate).toISOString(),
                lte: endOfDay(endDate).toISOString()
            };
        };

        const _count = await this.repository.notes.count(countArgs);
        const notes = await this.repository.notes.findMany(queryArgs);

        if(_count === 0) {
            throw new ExceptionError("Notas não encontradas", 404);
        };

        const pages: number = parseInt((_count / 10).toFixed(0));
        const noteList = notes.map((n) => {
            return NoteEntity.with({
                id: n.id,
                content: n.text,
                userId: n.user_id,
                createdAt: n.createdAt,
                updatedAt: n.updatedAt
            });
        });

        
        return {
            notes: noteList,
            totalPages: pages === 0 ? 1 : pages,
            totalItems: _count
        };
    };

    public async find(id: string): Promise<NoteEntity> {
        const note = await this.repository.notes.findUnique({ where: { id }});

        if(!note) {
            throw new ExceptionError("Nota não encontrada", 404);
        };

        return NoteEntity.with({
            id: note.id,
            content: note.text,
            userId: note.user_id,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    };

    public async update(id: string, content: string): Promise<void> {
        await this.find(id);

        await this.repository.notes.update({
            where: { id },
            data: {
                text: content,
                updatedAt: startOfDay(new Date())
            }
        });

        return;
    };
}