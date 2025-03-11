import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { DeleteUserInputDto, DeleteUserUsecase } from "../../../../../usecase/admin/delete.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";



export class DeleteUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUsecase
    ) {};

    public static build(deleteUserService: DeleteUserUsecase) {
        return new DeleteUserRoute("/admin/user/:id", HttpMethod.DELETE, deleteUserService); 
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: DeleteUserInputDto = { id };

            await this.deleteUserService.execute(input);
            return response.status(200).send();
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
    }
}