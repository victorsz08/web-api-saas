import { ContractEntity } from "../../domain/entities/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";



export type SaveContractInputDto = {
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    price: number;
    contact: string;
    userId: string;
};

export type SaveContractOutputDto = {
    id: string;
};

export class SaveContractUsecase implements Usecase<SaveContractInputDto, SaveContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new SaveContractUsecase(contractGateway);
    };
    
    public async execute(input: SaveContractInputDto): Promise<SaveContractOutputDto> {
        const { number, local, price, scheduleDate, contact, scheduleTime, userId } = input;

        const aContract = ContractEntity.build(number, local, scheduleDate, scheduleTime, price, contact, userId);
        await this.contractGateway.save(aContract);
        const output = this.present(aContract);

        return output;
    };

    private present(contract: ContractEntity): SaveContractOutputDto {
        return {
            id: contract.id
        };
    };
};