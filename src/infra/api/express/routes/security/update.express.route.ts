import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateSecurityInputDto, UpdateSecurityUsecase } from "../../../../../usecase/security/update.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";


export class UpdateSecurityRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateSecurityService: UpdateSecurityUsecase
    ) {};

    public static build(updateSecurityService: UpdateSecurityUsecase) {
        return new UpdateSecurityRoute("/admin/security/:userId", HttpMethod.PUT, updateSecurityService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;
            const { roleId } = request.body;
            const input: UpdateSecurityInputDto = { userId, roleId };

            await this.updateSecurityService.execute(input);
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
    };
};