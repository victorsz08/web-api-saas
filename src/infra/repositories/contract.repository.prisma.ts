import { Prisma, PrismaClient, Status } from "@prisma/client";
import { ContractEntity, StatusType } from "../../domain/entities/contract.entity";
import { ContractGateway, ListContractDto, QueryListContract } from "../../domain/gateway/contract.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";
import { endOfDay, formatISO, startOfDay } from "date-fns";



export class ContractRepository implements ContractGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new ContractRepository(repository)
    };
    
    public async save(contract: ContractEntity): Promise<void> {
        const { 
            id, 
            number,
            local,
            scheduleDate,
            scheduleTime,
            price,
            status,
            userId,
            contact,
            createdAt,
            updatedAt
        } = contract;

        const user = await this.repository.user.findUnique({ where: { id: userId }});
        
        if(!user) {
            throw new ExceptionError("usuario não encontrado", 404)
        };

        await this.repository.contract.create({
            data: {
                id: id,
                number: number,
                local: local,
                installationDate: startOfDay(scheduleDate),
                installationHour: scheduleTime,
                price: price,
                phone: contact,
                status: status as Status,
                products: [""],
                User: {
                    connect: { id: userId }
                },
                createdAt: createdAt,
                updatedAt: updatedAt
            }
        });

        return;
    };

    public async find(id: string): Promise<ContractEntity> {
        const contract = await this.repository.contract.findUnique({ where: { id } });

        if(!contract) {
            throw new ExceptionError("Contrato não encontrado", 404);
        };

        return ContractEntity.with({
            id: contract.id,
            number: contract.number,
            local: contract.local,
            scheduleDate: contract.installationDate,
            scheduleTime: contract.installationHour,
            price: contract.price,
            contact: contract.phone,
            status: contract.status as StatusType,
            userId: contract.userId,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt
        });
    };

    public async list(query: QueryListContract): Promise<ListContractDto> {
        const { userId, page, createdAtDateIn, createdAtDateOut, scheduleDateIn, scheduleDateOut, status } = query;

        const queryCount: Prisma.ContractCountArgs = {
            where: { User: { id: userId }}
        };

        const queryArgs: Prisma.ContractFindManyArgs = {
            where: {
                User: { id: userId }
            },
            take: 10,
            orderBy: {
                installationDate: "desc"
            }
        };

        if(createdAtDateIn && createdAtDateOut) {
            queryArgs.where!.createdAt = {
                gte: formatISO(new Date(createdAtDateIn)),
                lte: formatISO(new Date(createdAtDateOut))
            };
            queryCount.where!.createdAt = {
                gte: formatISO(new Date(createdAtDateIn)),
                lte: formatISO(new Date(createdAtDateOut))
            };
        };

        if(scheduleDateIn && scheduleDateOut) {
            queryArgs.where!.installationDate = {
                gte: formatISO(new Date(scheduleDateIn)),
                lte: formatISO(new Date(scheduleDateOut))
            };

            queryCount.where!.installationDate = {
                gte: formatISO(new Date(scheduleDateIn)),
                lte: formatISO(new Date(scheduleDateOut)) 
            };
        };

        if(page) {
            queryArgs.skip = page > 1 ? (page - 1) * 10 : 0;
        };

        if(status) {
            queryArgs.where!.status = status as Status;
            queryCount.where!.status = status as Status;
        };

        const contracts = await this.repository.contract.findMany(queryArgs);
        const countContracts = await this.repository.contract.count(queryCount);

        const contractList = contracts.map((c) => {
            return ContractEntity.with({
                id: c.id,
                number: c.number,
                local: c.local,
                scheduleDate: c.installationDate,
                scheduleTime: c.installationHour,
                price: c.price,
                contact: c.phone,
                userId: c.userId,
                status: c.status as StatusType,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt
            });
        });

        const countPages: number = parseInt((countContracts / 10).toFixed(0));

        return {
            contracts: contractList,
            totalItems: countContracts,
            totalPages: (countPages === 0 && countContracts === 0) ? 1 : countPages
        };
    };

    public async update(id: string, number: number, local: string, price: number, contact: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                number: number,
                local: local,
                price: price,
                phone: contact
            }
        });

        return;
    };


    public async updateStatus(id: string, status: StatusType): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                status: status as Status
            }
        });

        return;
    };


    public async updateSchedule(id: string, scheduleDate: Date, scheduleTime: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: scheduleDate,
                installationHour: scheduleTime
            }
        });

        return;
    };

    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.delete({
            where: { id }
        });

        return;
    };
};