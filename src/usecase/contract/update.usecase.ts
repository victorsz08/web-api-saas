import { ContractEntity } from "../../domain/entities/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";


export type UpdateContractInputDto = {
    id: string;
    number: number;
    local: string;
    price: number;
    contact: string;
};

export type UpdateContractOutputDto = {
    id: string;
};

export class UpdateContractUsecase implements Usecase<UpdateContractInputDto, UpdateContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new UpdateContractUsecase(contractGateway);
    };
    
    public async execute(input: UpdateContractInputDto): Promise<UpdateContractOutputDto> {
        const { id, number, local, price, contact } = input;
        const aContract = await this.contractGateway.find(id);

        await this.contractGateway.update(id, number, local, price, contact);
        const output = this.present(aContract);

        return output;
    };

    private present(data: ContractEntity): UpdateContractOutputDto {
        return {
            id: data.id
        };
    };
};