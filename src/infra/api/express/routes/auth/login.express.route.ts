import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { AuthLoginInputDto, AuthLoginOutputDto, AuthLoginUsecase } from "../../../../../usecase/auth/login.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";


export type AuthLoginResponseDto = {
    token: string;
};


export class AuthLoginRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authLoginService: AuthLoginUsecase
    ) {};

    public static build(authLoginService: AuthLoginUsecase) {
        return new AuthLoginRoute("/auth/login", HttpMethod.POST, authLoginService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { username, password } = request.body;
            const input: AuthLoginInputDto = { username, password };
            
            const data = await this.authLoginService.execute(input);
            const responseBody = this.present(data);

            return response.status(200).json(responseBody).send();
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private present(data: AuthLoginOutputDto): AuthLoginResponseDto {
        return {
            token: data.token
        };
    };
};