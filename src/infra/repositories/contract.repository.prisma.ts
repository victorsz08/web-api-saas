import { PrismaClient } from "@prisma/client";
import { ContractEntity, StatusType } from "../../domain/entities/contract.entity";
import { ContractGateway, ListContractDto, QueryListContract } from "../../domain/gateway/contract.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";



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
                installationDate: scheduleDate,
                installationHour: scheduleTime,
                price: price,
                phone: contact,
                status: status,
                products: ["null"],
                User: {
                    connect: { id: userId }
                },
                createdAt: createdAt,
                updatedAt: updatedAt
            }
        });

        return;
    };

    find(id: string): Promise<ContractEntity> {
        throw new Error("Method not implemented.");
    }
    list(query: QueryListContract): Promise<ListContractDto> {
        throw new Error("Method not implemented.");
    }
    update(number: number, local: string, price: string, contact: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateStatus(id: string, status: StatusType): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateSchedule(id: string, scheduleDate: Date, scheduleTime: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}