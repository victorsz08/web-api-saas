import { AdminUserGateway } from "../../domain/gateway/admin-user.gateway";
import { Usecase } from "../usecase";


export type DeleteUserInputDto = {
    id: string;
};

export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, void> {
  
    private constructor(private readonly adminUserGateway: AdminUserGateway) {};

    public static buid(adminUserGateway: AdminUserGateway){
        return new DeleteUserUsecase(adminUserGateway);
    };
    
    public async execute(input: DeleteUserInputDto): Promise<void> {
        const { id } = input;
        await this.adminUserGateway.delete(id);

        return;
    };
};