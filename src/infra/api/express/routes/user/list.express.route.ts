import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListUserInputDto, ListUserOutputDto, ListUserUsecase } from "../../../../../usecase/user/list.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";


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

            try {
                const data = await this.listUserService.execute(input);
                const responseBody = this.present(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof ExceptionError) {
                    return response.status(error.statusCode).json({ status: error.statusCode, error: error.message }).send();
                };

                return response.status(500).json({ status: 500, error: "Server internal error" }).send();
            };
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware?(): (request: Request, response: Response, nextFunction: NextFunction) => Promise<any> {
        throw new Error("Method not implemented.");
    };

    private present(data: ListUserOutputDto): ListUserResponseDto {
        return {
            users: data.users.map((u) => u)
        };
    };
};