import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindRoleInputDto, FindRoleOutputDto, FindRoleUsecase } from "../../../../../usecase/role/find.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";




export type FindRoleResponseDto = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindRoleRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findRoleService: FindRoleUsecase
    ) {};

    public static build(findRoleService: FindRoleUsecase) {
        return new FindRoleRoute("/roles/:id", HttpMethod.GET, findRoleService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: FindRoleInputDto = { id };

            const data = await this.findRoleService.execute(input);
            const responseBody = this.present(data);

            return response.status(200).json(responseBody).send();
        }
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware?(): Array<any> {
        return [ auth() ];
    };

    private present(data: FindRoleOutputDto): FindRoleResponseDto {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};