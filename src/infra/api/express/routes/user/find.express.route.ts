import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindUserInputDto, FindUserOutputDto, FindUserUsecase } from "../../../../../usecase/user/find.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type FindUserResponseDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findUserService: FindUserUsecase
    ) {};

    public static build(findUserService: FindUserUsecase) {
        return new FindUserRoute("/users/:id", HttpMethod.GET, findUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: FindUserInputDto = { id };

            const data = await this.findUserService.execute(input);
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

    public getMiddleware?(): Array<any> {
        return [ auth() ]
    };

    private present(data: FindUserOutputDto): FindUserResponseDto {
        return {
            id: data.id,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};