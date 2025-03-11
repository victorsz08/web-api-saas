import { ContractEntity, StatusType } from "../entities/contract.entity";

export type QueryListContract = {
    userId: string;
    page?: number;
    status?: string;
    createdAtDateIn?: Date;
    createdAtDateOut?: Date;
    scheduleDateIn?: Date;
    scheduleDateOut?: Date;
};

export type ListContractDto = {
    contracts: ContractEntity[];
    totalItems: number;
    totalPages: number;
}

export interface ContractGateway {
    save(contract: ContractEntity): Promise<void>;
    find(id: string): Promise<ContractEntity>;
    list(query: QueryListContract): Promise<ListContractDto>;
    update(id: string, number: number, local: string, price: number, contact: string): Promise<void>;
    updateStatus(id: string, status: StatusType): Promise<void>;
    updateSchedule(id: string, scheduleDate: Date, scheduleTime: string): Promise<void>;
    delete(id: string): Promise<void>;
};