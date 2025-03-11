import { UserEntity } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";


export type ListUserInputDto = {
    search?: string;
};

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new ListUserUsecase(userGateway);
    };
    
    public async execute({ search }: ListUserInputDto): Promise<ListUserOutputDto> {
        const users = await this.userGateway.list(search);

        const output = this.present(users);

        return output;
    };

    private present(users: UserEntity[]): ListUserOutputDto {
        return {
            users: users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };
            })
        };
    };
};