import { UserEntity } from "../../domain/entities/user.entity";
import { AuthGateway } from "../../domain/gateway/auth.gateway";
import { Usecase } from "../usecase";


export type AuthSessionInputDto = {
    token: string;
};

export type AuthSessionOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export class AuthSessionUsecase implements Usecase<AuthSessionInputDto, AuthSessionOutputDto> {
    
    private constructor(private readonly authGateway: AuthGateway) {};

    public static build(authGateway: AuthGateway) {
        return new AuthSessionUsecase(authGateway);
    };
    
    public async execute(input: AuthSessionInputDto): Promise<AuthSessionOutputDto> {
        const { token } = input;
        const aUser = await this.authGateway.session(token);

        const output = this.present(aUser);
        return output;
    };

    private present(user: UserEntity): AuthSessionOutputDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
    };
};