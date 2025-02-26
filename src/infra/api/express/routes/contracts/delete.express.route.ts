import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { DeleteContractInputDto, DeleteContractUsecase } from "../../../../../usecase/contract/delete.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";




export class DeleteContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteContractService: DeleteContractUsecase
    ) {};

    public static build(deleteContractService: DeleteContractUsecase) {
        return new DeleteContractRoute("/contracts/:id", HttpMethod.DELETE, deleteContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: DeleteContractInputDto = { id };

            try {
                await this.deleteContractService.execute(input);
                
                return response.status(200).send();
            } catch (error) {
                if(error instanceof ExceptionError) {
                    return response.status(error.statusCode).json({ status: error.statusCode, error: error.message }).send();
                };

                return response.status(500).json({ status: 500, error: "Server internal error" }).send();
            }
        }
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware?(): (request: Request, response: Response, nextFunction: NextFunction) => Promise<any> {
        return auth();
    };
};