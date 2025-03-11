import { ContractEntity, StatusType } from "../../domain/entities/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";



export type UpdateStatusInputDto = {
    id: string;
    status: StatusType;
};

export type UpdateStatusOutputDto = {
    id: string;
};

export class UpdateStatusUsecase implements Usecase<UpdateStatusInputDto, UpdateStatusOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new UpdateStatusUsecase(contractGateway);
    };
    
    public async execute(input: UpdateStatusInputDto): Promise<UpdateStatusOutputDto> {
        const { id, status } = input;
        
        const aContract = await this.contractGateway.find(id);
        await this.contractGateway.updateStatus(id, status);
        const output = this.present(aContract);

        return output;
    };

    private present(data: ContractEntity): UpdateStatusOutputDto {
        return {
            id: data.id
        };
    };
};