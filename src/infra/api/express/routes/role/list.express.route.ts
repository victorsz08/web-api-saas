import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListRoleInputDto, ListRoleOutputDto, ListRoleUsecase } from "../../../../../usecase/role/list.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";



export type ListRoleResponseDto = {
    roles: {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export class ListRoleRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listRoleService: ListRoleUsecase
    ) {};

    public static build(listRoleService: ListRoleUsecase) {
        return new ListRoleRoute("/roles", HttpMethod.GET, listRoleService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { search } = request.query as Record<string, string>;
            const input: ListRoleInputDto = { search };

            const data = await this.listRoleService.execute(input);
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

    private present(data: ListRoleOutputDto): ListRoleResponseDto {
        return {
            roles: data.roles.map((role) => {
                return {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                    createdAt: role.createdAt,
                    updatedAt: role.updatedAt
                };
            })
        };
    };
};