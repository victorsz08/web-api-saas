import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";


export type DeleteContractInputDto = {
    id: string;
};

export class DeleteContractUsecase implements Usecase<DeleteContractInputDto, void> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new DeleteContractUsecase(contractGateway);
    };
    
    public async execute(input: DeleteContractInputDto): Promise<void> {
        const { id } = input;
        await this.contractGateway.delete(id);

        return;
    };
};