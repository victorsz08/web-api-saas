import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateContractInputDto, UpdateContractOutputDto, UpdateContractUsecase } from "../../../../../usecase/contract/update.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type UpdateContractResponseDto = {
    id: string;
};

export class UpdateContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateContractService: UpdateContractUsecase
    ) {};

    public static build(updateContractService: UpdateContractUsecase) {
        return new UpdateContractRoute("/contracts/:id", HttpMethod.PUT, updateContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { number, local, price, contact } = request.body;
            const input: UpdateContractInputDto = { id, number, local, price, contact };

            const data = await this.updateContractService.execute(input);
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

    private present(data: UpdateContractOutputDto): UpdateContractResponseDto {
        return {
            id: data.id
        };
    };
};