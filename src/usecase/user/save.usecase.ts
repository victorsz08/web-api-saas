import { UserEntity } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";



export type SaveUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};


export type SaveUserOutputDto = {
    id: string;
};

export class SaveUserUsecase implements Usecase<SaveUserInputDto, SaveUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new SaveUserUsecase(userGateway);
    };
    
    public async execute({ username, firstName, lastName, password}: SaveUserInputDto): Promise<SaveUserOutputDto> {
        const aUser = UserEntity.build(username, firstName, lastName, password);

        await this.userGateway.save(aUser);

        const output = this.present(aUser);

        return output;
    };

    private present(user: UserEntity): SaveUserOutputDto {
        return {
            id: user.id
        }
    };
};