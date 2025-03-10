import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveSecurityInputDto, SaveSecurityUsecase } from "../../../../../usecase/security/save.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";





export class SaveSecurityRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveSecurityService: SaveSecurityUsecase
    ) {};

    public static build(saveSecurityService: SaveSecurityUsecase) {
        return new SaveSecurityRoute("/security", HttpMethod.POST, saveSecurityService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId, roleId } = request.body;
            const input: SaveSecurityInputDto = { userId, roleId };

            await this.saveSecurityService.execute(input);
            return response.status(201).send();
        };
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
};