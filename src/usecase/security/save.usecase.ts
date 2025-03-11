import { SecurityGateway } from "../../domain/gateway/security.gateway";
import { Usecase } from "../usecase";


export type SaveSecurityInputDto = {
    userId: string;
    roleId: string;
};

export type SaveSecurityOutputDto = void;

export class SaveSecurityUsecase implements Usecase<SaveSecurityInputDto, SaveSecurityOutputDto> {
    
    private constructor(private readonly securityGateway: SecurityGateway) {};

    public static build(securityGateway: SecurityGateway) {
        return new SaveSecurityUsecase(securityGateway);
    };
    
    public async execute(input: SaveSecurityInputDto): Promise<SaveSecurityOutputDto> {
        const { userId, roleId } = input;

        await this.securityGateway.save(userId, roleId);

        return;
    };
};