import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveRoleInputDto, SaveRoleOutputDto, SaveRoleUsecase } from "../../../../../usecase/role/save.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type SaveRoleResponseDto = {
    id: string;
};

export class SaveRoleRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveRoleService: SaveRoleUsecase
    ) {};

    public static build(saveRoleService: SaveRoleUsecase) {
        return new SaveRoleRoute("/admin/roles", HttpMethod.POST, saveRoleService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { name, description } = request.body;
            const input: SaveRoleInputDto = { name, description };

            const data = await this.saveRoleService.execute(input);
            const responseBody = this.present(data);

            return response.status(201).json(responseBody).send();
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

    private present(data: SaveRoleOutputDto): SaveRoleResponseDto {
        return {
            id: data.id
        };
    };
};