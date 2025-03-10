import { Request, Response, NextFunction } from "express";
import { StatusType } from "../../../../../domain/entities/contract.entity";
import { HttpMethod, Route } from "../route.express";
import { FindContractInputDto, FindContractOutputDto, FindContractUsecase } from "../../../../../usecase/contract/find.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type FindContractResponseDto = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    price: number;
    status: StatusType;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findContractService: FindContractUsecase
    ) {};

    public static build(findContractService: FindContractUsecase) {
        return new FindContractRoute("/contracts/:id", HttpMethod.GET, findContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: FindContractInputDto = { id };

            const data = await this.findContractService.execute(input);
            const responseBody = this.present(data);

            return response.status(200).json(responseBody).send();
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getMiddleware?(): Array<any> {
        return [ auth() ]
    };

    private present(data: FindContractOutputDto): FindContractResponseDto {
        return {
            id: data.id,
            number: data.number,
            local: data.local,
            scheduleDate: data.scheduleDate,
            scheduleTime: data.scheduleTime,
            price: data.price,
            status: data.status,
            contact: data.contact,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};