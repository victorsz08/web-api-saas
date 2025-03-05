import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveContractInputDto, SaveContractOutputDto, SaveContractUsecase } from "../../../../../usecase/contract/save.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type SaveContractResponseDto = {
    id: string;
};


export class SaveContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveContractService: SaveContractUsecase
    ) {};

    public static build(saveContractService: SaveContractUsecase) {
        return new SaveContractRoute("/contracts", HttpMethod.POST, saveContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { number, local, scheduleDate, scheduleTime, contact, price, userId } = request.body;
            const input: SaveContractInputDto = { number, local, scheduleDate, scheduleTime, contact, price, userId };

            try {
                const data = await this.saveContractService.execute(input);
                const responseBody = this.present(data);

                return response.status(201).json(responseBody).send();
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
    
    public getMiddleware?(): Array<any> {
        return [ auth() ]
    };

    private present(data: SaveContractOutputDto): SaveContractResponseDto {
        return {
            id: data.id
        };
    };
};