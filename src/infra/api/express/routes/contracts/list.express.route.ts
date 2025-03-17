import { Request, Response, NextFunction } from "express";
import { StatusType } from "../../../../../domain/entities/contract.entity";
import { HttpMethod, Route } from "../route.express";
import { ListContractInputDto, ListContractOutputDto, ListContractUsecase } from "../../../../../usecase/contract/list.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type ListContractResponseDto = {
    contracts: {
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
    }[];
    totalPages: number;
    totalItems: number;
};

export class ListContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listContractService: ListContractUsecase
    ) {};

    public static build(listContractService: ListContractUsecase) {
        return new ListContractRoute("/contracts", HttpMethod.GET, listContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { 
                userId, 
                page, 
                createdAtDateIn, 
                createdAtDateOut, 
                scheduleDateIn, 
                scheduleDateOut, 
                status 
            } = request.query as Record<string, any>;
            
            const input: ListContractInputDto = {
                userId, 
                page, 
                createdAtDateIn, 
                createdAtDateOut, 
                scheduleDateIn, 
                scheduleDateOut, 
                status
            };

            const data = await this.listContractService.execute(input);
            const responseBody = this.present(data);

            return response.status(200).json(responseBody);
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

    private present(data: ListContractOutputDto): ListContractResponseDto {
        return {
            contracts: data.contracts.map((c) => {
                return {
                    id: c.id,
                    number: c.number,
                    local: c.local,
                    scheduleDate: c.scheduleDate,
                    scheduleTime: c.scheduleTime,
                    price: c.price,
                    status: c.status,
                    contact: c.contact,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt
                }
            }),
            totalPages: data.totalPages,
            totalItems: data.totalItems
        };
    };
};