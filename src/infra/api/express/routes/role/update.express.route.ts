import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateRoleInputDto, UpdateRoleOutputDto, UpdateRoleUsecase } from "../../../../../usecase/role/update.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";



export type UpdateRoleResponseDto = {
    id: string;
};

export class UpdateRoleRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateRoleService: UpdateRoleUsecase
    ) {};

    public static build(updateRoleService: UpdateRoleUsecase) {
        return new UpdateRoleRoute("/roles/:id", HttpMethod.PUT, updateRoleService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { name, description } = request.body;
            const input: UpdateRoleInputDto = { id, name, description };

            const data = await this.updateRoleService.execute(input);
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

    private present(data: UpdateRoleOutputDto): UpdateRoleResponseDto {
        return {
            id: data.id
        };
    };
}; 