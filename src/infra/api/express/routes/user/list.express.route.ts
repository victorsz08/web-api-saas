import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListUserInputDto, ListUserOutputDto, ListUserUsecase } from "../../../../../usecase/user/list.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type ListUserResponseDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};


export class ListUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase
    ) {};

    public static build(listUserService: ListUserUsecase) {
        return new ListUserRoute("/users", HttpMethod.GET, listUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { search } = request.query as any;
            const input: ListUserInputDto = { search };

            const data = await this.listUserService.execute(input);
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

    private present(data: ListUserOutputDto): ListUserResponseDto {
        return {
            users: data.users.map((u) => u)
        };
    };
};