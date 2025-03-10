"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const note_entity_1 = require("../../domain/entities/note.entity");
const exception_error_1 = require("../../package/exception-error/exception.error");
const date_fns_1 = require("date-fns");
class NoteRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new NoteRepository(repository);
    }
    ;
    async save(data) {
        const { id, content, userId, createdAt, updatedAt } = data;
        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new exception_error_1.ExceptionError("Usuário não encontrado", 404);
        }
        ;
        await this.repository.notes.create({
            data: {
                id: id,
                text: content,
                user: { connect: { id: userId } },
                createdAt: (0, date_fns_1.startOfDay)(createdAt).toISOString(),
                updatedAt: (0, date_fns_1.startOfDay)(updatedAt).toISOString()
            }
        });
        return;
    }
    ;
    async list(query) {
        const { userId, page, endDate, startDate } = query;
        const countArgs = {
            where: {
                user: {
                    id: userId
                }
            }
        };
        const queryArgs = {
            where: {
                user: {
                    id: userId
                }
            },
            take: 10,
            skip: page > 1 ? (page - 1) * 10 : 0
        };
        if (startDate && endDate) {
            queryArgs.where.createdAt = {
                gte: (0, date_fns_1.startOfDay)(startDate).toISOString(),
                lte: (0, date_fns_1.endOfDay)(endDate).toISOString()
            };
            countArgs.where.createdAt = {
                gte: (0, date_fns_1.startOfDay)(startDate).toISOString(),
                lte: (0, date_fns_1.endOfDay)(endDate).toISOString()
            };
        }
        ;
        const _count = await this.repository.notes.count(countArgs);
        const notes = await this.repository.notes.findMany(queryArgs);
        if (_count === 0) {
            throw new exception_error_1.ExceptionError("Notas não encontradas", 404);
        }
        ;
        const pages = parseInt((_count / 10).toFixed(0));
        const noteList = notes.map((n) => {
            return note_entity_1.NoteEntity.with({
                id: n.id,
                content: n.text,
                userId: n.userId,
                createdAt: n.createdAt,
                updatedAt: n.updatedAt
            });
        });
        return {
            notes: noteList,
            totalPages: pages === 0 ? 1 : pages,
            totalItems: _count
        };
    }
    ;
    async find(id) {
        const note = await this.repository.notes.findUnique({ where: { id } });
        if (!note) {
            throw new exception_error_1.ExceptionError("Nota não encontrada", 404);
        }
        ;
        return note_entity_1.NoteEntity.with({
            id: note.id,
            content: note.text,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    }
    ;
    async update(id, content) {
        await this.find(id);
        await this.repository.notes.update({
            where: { id },
            data: {
                text: content,
                updatedAt: (0, date_fns_1.startOfDay)(new Date())
            }
        });
        return;
    }
    ;
}
exports.NoteRepository = NoteRepository;
