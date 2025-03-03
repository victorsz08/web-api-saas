import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { AuthSessionInputDto, AuthSessionOutputDto, AuthSessionUsecase } from "../../../../../usecase/auth/session.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type AuthSessionResponseDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export class AuthSessionRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authSessionService: AuthSessionUsecase
    ) {};

    public static build(authSessionService: AuthSessionUsecase) {
        return new AuthSessionRoute("/auth/session", HttpMethod.GET, authSessionService);
    };

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { token } = request.headers.authorization as any;
            const input: AuthSessionInputDto = { token };

            try {
                const data = await this.authSessionService.execute(input);
                const responseBody = this.present(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof ExceptionError) {
                    return response.status(error.statusCode).json({ status: error.statusCode, error: error.message }).send();
                };

                return response.status(500).json({ status: 500, error: "server internal error" }).send();
            }
        }
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware?(): (request: Request, response: Response, nextFunction: NextFunction) => Promise<any> {
        return auth();
    };

    private present(data: AuthSessionOutputDto): AuthSessionResponseDto {
        return {
            id: data.id,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName
        };
    };
};