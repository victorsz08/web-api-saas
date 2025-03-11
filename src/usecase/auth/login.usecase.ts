import { AuthGateway } from "../../domain/gateway/auth.gateway";
import { Usecase } from "../usecase";


export type AuthLoginInputDto = {
    username: string;
    password: string;
};

export type AuthLoginOutputDto = {
    token: string;
};

export class AuthLoginUsecase implements Usecase<AuthLoginInputDto, AuthLoginOutputDto> {
    
    private constructor(private readonly authGateway: AuthGateway) {};

    public static build(authGateway: AuthGateway) {
        return new AuthLoginUsecase(authGateway);
    };
    
    public async execute(input: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
        const { username, password } = input;
        const token = await this.authGateway.login(username, password);

        const output = this.present(token);

        return output;
    };

    private present(token: string): AuthLoginOutputDto {
        return {
            token: token
        };
    };
};