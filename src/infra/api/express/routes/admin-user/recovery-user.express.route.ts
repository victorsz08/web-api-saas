import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { RecoveryUserInputDto, RecoveryUserOutputDto, RecoveryUserUsecase } from "../../../../../usecase/admin/recovery.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";



export type RecoveryUserResponseDto = {
    newPassword: string;
};

export class RecoveryUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly recoveryUserService: RecoveryUserUsecase
    ) {};

    public static build(recoveryUserService: RecoveryUserUsecase) {
        return new RecoveryUserRoute("/admin/user/recovery/:id", HttpMethod.POST, recoveryUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: RecoveryUserInputDto = { id };

            const data = await this.recoveryUserService.execute(input);
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
        return [ auth() ];
    };

    private present(data: RecoveryUserOutputDto): RecoveryUserResponseDto {
        return {
            newPassword: data.newPassword
        };
    };
};