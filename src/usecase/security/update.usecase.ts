import { SecurityGateway } from "../../domain/gateway/security.gateway";
import { Usecase } from "../usecase";


export type UpdateSecurityInputDto = {
    userId: string;
    roleId: string;
};

export type UpdateSecurityOutputDto = void;


export class UpdateSecurityUsecase implements Usecase<UpdateSecurityInputDto, UpdateSecurityOutputDto> {
    
    private constructor(private readonly securityGateway: SecurityGateway) {};

    public static build(securityGateway: SecurityGateway) {
        return new UpdateSecurityUsecase(securityGateway);
    };

    public async execute(input: UpdateSecurityInputDto): Promise<void> {
        const { userId, roleId } = input;
        await this.securityGateway.update(userId, roleId);

        return;
    };
};