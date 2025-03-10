"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRepository = void 0;
const contract_entity_1 = require("../../domain/entities/contract.entity");
const exception_error_1 = require("../../package/exception-error/exception.error");
const date_fns_1 = require("date-fns");
class ContractRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new ContractRepository(repository);
    }
    ;
    async save(contract) {
        const { id, number, local, scheduleDate, scheduleTime, price, status, userId, contact, createdAt, updatedAt } = contract;
        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new exception_error_1.ExceptionError("usuario não encontrado", 404);
        }
        ;
        await this.repository.contract.create({
            data: {
                id: id,
                number: number,
                local: local,
                installationDate: (0, date_fns_1.startOfDay)(scheduleDate).toISOString(),
                installationHour: scheduleTime,
                price: price,
                phone: contact,
                status: status,
                products: [""],
                user: {
                    connect: { id: userId }
                },
                createdAt: (0, date_fns_1.startOfDay)(createdAt).toISOString(),
                updatedAt: (0, date_fns_1.startOfDay)(updatedAt).toISOString()
            }
        });
        return;
    }
    ;
    async find(id) {
        const contract = await this.repository.contract.findUnique({ where: { id } });
        if (!contract) {
            throw new exception_error_1.ExceptionError("Contrato não encontrado", 404);
        }
        ;
        return contract_entity_1.ContractEntity.with({
            id: contract.id,
            number: contract.number,
            local: contract.local,
            scheduleDate: contract.installationDate,
            scheduleTime: contract.installationHour,
            price: contract.price,
            contact: contract.phone,
            status: contract.status,
            userId: contract.userId,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt
        });
    }
    ;
    async list(query) {
        const { userId, page, createdAtDateIn, createdAtDateOut, scheduleDateIn, scheduleDateOut, status } = query;
        const queryCount = {
            where: { user: { id: userId } }
        };
        const queryArgs = {
            where: {
                user: { id: userId }
            },
            take: 10,
            orderBy: {
                installationDate: "desc"
            }
        };
        if (createdAtDateIn && createdAtDateOut) {
            queryArgs.where.createdAt = {
                gte: (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(createdAtDateIn).toISOString(), 1),
                lte: (0, date_fns_1.addDays)((0, date_fns_1.endOfDay)(createdAtDateOut).toISOString(), 1)
            };
            queryCount.where.createdAt = {
                gte: (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(createdAtDateIn).toISOString(), 1),
                lte: (0, date_fns_1.addDays)((0, date_fns_1.endOfDay)(createdAtDateOut).toISOString(), 1)
            };
        }
        ;
        if (scheduleDateIn && scheduleDateOut) {
            queryArgs.where.installationDate = {
                gte: (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(scheduleDateIn).toISOString(), 1),
                lte: (0, date_fns_1.addDays)((0, date_fns_1.endOfDay)(scheduleDateOut).toISOString(), 1)
            };
            queryCount.where.installationDate = {
                gte: (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(scheduleDateIn).toISOString(), 1),
                lte: (0, date_fns_1.addDays)((0, date_fns_1.endOfDay)(scheduleDateOut).toISOString(), 1)
            };
        }
        ;
        if (page) {
            queryArgs.skip = page > 1 ? (page - 1) * 10 : 0;
        }
        ;
        if (status) {
            queryArgs.where.status = status;
            queryCount.where.status = status;
        }
        ;
        const contracts = await this.repository.contract.findMany(queryArgs);
        const countContracts = await this.repository.contract.count(queryCount);
        const contractList = contracts.map((c) => {
            return contract_entity_1.ContractEntity.with({
                id: c.id,
                number: c.number,
                local: c.local,
                scheduleDate: c.installationDate,
                scheduleTime: c.installationHour,
                price: c.price,
                contact: c.phone,
                userId: c.userId,
                status: c.status,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt
            });
        });
        const countPages = parseInt((countContracts / 10).toFixed(0));
        return {
            contracts: contractList,
            totalItems: countContracts,
            totalPages: (countPages === 0 && countContracts === 0) ? 1 : countPages
        };
    }
    ;
    async update(id, number, local, price, contact) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                number: number,
                local: local,
                price: price,
                phone: contact,
                updatedAt: (0, date_fns_1.startOfDay)(new Date()).toISOString()
            }
        });
        return;
    }
    ;
    async updateStatus(id, status) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                status: status,
                updatedAt: (0, date_fns_1.startOfDay)(new Date()).toISOString()
            }
        });
        return;
    }
    ;
    async updateSchedule(id, scheduleDate, scheduleTime) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: scheduleDate,
                installationHour: scheduleTime,
                updatedAt: (0, date_fns_1.startOfDay)(new Date()).toISOString()
            }
        });
        return;
    }
    ;
    async delete(id) {
        await this.find(id);
        await this.repository.contract.delete({
            where: { id }
        });
        return;
    }
    ;
}
exports.ContractRepository = ContractRepository;
;
