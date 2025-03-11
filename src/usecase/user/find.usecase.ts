import { UserEntity } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";



export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new FindUserUsecase(userGateway);
    };
    
    public async execute({ id }: FindUserInputDto): Promise<FindUserOutputDto> {
        const user = await this.userGateway.find(id);

        const output = this.present(user);

        return output;
    };

    private present(user: UserEntity): FindUserOutputDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    };
};