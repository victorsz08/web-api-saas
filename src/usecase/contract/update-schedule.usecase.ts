import { ContractEntity } from "../../domain/entities/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract.gateway";
import { Usecase } from "../usecase";


export type UpdateScheduleInputDto = {
    id: string;
    scheduleDate: Date;
    scheduleTime: string;
};

export type UpdateScheduleOutputDto = {
    id: string;
};

export class UpdateScheduleUsecase implements Usecase<UpdateScheduleInputDto, UpdateScheduleOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new UpdateScheduleUsecase(contractGateway);
    };
    
    public async execute(input: UpdateScheduleInputDto): Promise<UpdateScheduleOutputDto> {
        const { id, scheduleDate, scheduleTime } = input;
        const aContract = await this.contractGateway.find(id);
        
        await this.contractGateway.updateSchedule(id, scheduleDate, scheduleTime);
        const output = this.present(aContract);

        return output;
    };

    private present(data: ContractEntity): UpdateScheduleOutputDto {
        return {
            id: data.id
        };
    };
};