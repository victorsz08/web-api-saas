import { UserEntity } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";


export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type UpdateUserOutputDto = {
    id: string;
};

export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new UpdateUserUsecase(userGateway);
    };
    
    public async execute({ id, username, firstName, lastName } : UpdateUserInputDto): Promise<UpdateUserOutputDto> {
        const user = await this.userGateway.find(id);

        await this.userGateway.update(id, username, firstName, lastName);

        const output = this.present(user);

        return output;
    };

    private present(user: UserEntity): UpdateUserOutputDto {
        return {
            id: user.id
        };
    };
};