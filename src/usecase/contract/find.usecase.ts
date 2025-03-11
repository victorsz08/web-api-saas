import { ContractEntity, StatusType } from "../../domain/entities/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";


export type FindContractInputDto = {
    id: string;
};

export type FindContractOutputDto = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    price: number;
    status: StatusType;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindContractUsecase implements Usecase<FindContractInputDto, FindContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new FindContractUsecase(contractGateway);
    };
    
    public async execute({ id }: FindContractInputDto): Promise<FindContractOutputDto> {
        const aContract = await this.contractGateway.find(id);
        const output = this.present(aContract);

        return output;
    };

    private present(data: ContractEntity): FindContractOutputDto {
        return {
            id: data.id,
            number: data.number,
            local: data.local,
            scheduleDate: data.scheduleDate,
            scheduleTime: data.scheduleTime,
            price: data.price,
            status: data.status,
            userId: data.userId,
            contact: data.contact,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};