import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateStatusInputDto, UpdateStatusOutputDto, UpdateStatusUsecase } from "../../../../../usecase/contract/update-status.usecase";
import { StatusType } from "../../../../../domain/entities/contract.entity";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type UpdateStatusResponseDto = {
    id: string;
};

export class UpdateStatusRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateStatusService: UpdateStatusUsecase
    ) {};

    public static build(updateStatusService: UpdateStatusUsecase) {
        return new UpdateStatusRoute("/contracts/status/:id", HttpMethod.PUT, updateStatusService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { status } = request.body as Record<string, StatusType>;
            const input: UpdateStatusInputDto = { id, status };

            const data = await this.updateStatusService.execute(input);
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

    private present(data: UpdateStatusOutputDto): UpdateStatusResponseDto {
        return {
            id: data.id
        };
    };
};