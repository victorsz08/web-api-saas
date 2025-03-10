import { AdminUserGateway } from "../../domain/gateway/admin-user.gateway";
import { Usecase } from "../usecase";

export type RecoveryUserInputDto = {
    id: string;
};

export type RecoveryUserOutputDto = {
    newPassword: string;
};


export class RecoveryUserUsecase implements Usecase<RecoveryUserInputDto, RecoveryUserOutputDto> {
    
    private constructor(private readonly adminUsergateway: AdminUserGateway) {};

    public static build(adminUsergateway: AdminUserGateway) {
        return new RecoveryUserUsecase(adminUsergateway);
    };

    public async execute(input: RecoveryUserInputDto): Promise<RecoveryUserOutputDto> {
        const { id } = input;
        const aPassword = await this.adminUsergateway.recovery(id);

        const output = this.present(aPassword);
        return output;
    };

    private present(password: string): RecoveryUserOutputDto {
        return {
            newPassword: password
        };
    };
};