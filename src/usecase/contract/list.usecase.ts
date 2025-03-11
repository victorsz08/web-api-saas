import { StatusType } from "../../domain/entities/contract.entity";
import { ContractGateway, ListContractDto } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";


export type ListContractInputDto = {
    userId: string;
    page?: number;
    status?: string;
    createdAtDateIn?: Date;
    createdAtDateOut?: Date;
    scheduleDateIn?: Date;
    scheduleDateOut?: Date;
};

export type ListContractOutputDto = {
    contracts: {
        id: string;
        number: number;
        local: string;
        scheduleDate: Date;
        scheduleTime: string;
        price: number;
        contact: string;
        status: StatusType;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};

export class ListContractUsecase implements Usecase<ListContractInputDto, ListContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new ListContractUsecase(contractGateway);
    };
    
    public async execute(input: ListContractInputDto): Promise<ListContractOutputDto> {
        const aContracts = await this.contractGateway.list(input);
        const output = this.present(aContracts);

        return output;
    };

    private present(data: ListContractDto): ListContractOutputDto {
        return {
            contracts: data.contracts.map((c) => {
                return {
                    id: c.id,
                    number: c.number,
                    local: c.local,
                    scheduleDate: c.scheduleDate,
                    scheduleTime: c.scheduleTime,
                    price: c.price,
                    status: c.status,
                    contact: c.contact,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt
                }
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    };
};