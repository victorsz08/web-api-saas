import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveContractUsecase } from "../../../../../usecase/contract/save.usecase";



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
    
    getHandler(): (request: Request, response: Response) => Promise<any> {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        throw new Error("Method not implemented.");
    }
    getMethod(): HttpMethod {
        throw new Error("Method not implemented.");
    }
    getMiddleware?(): (request: Request, response: Response, nextFunction: NextFunction) => Promise<any> {
        throw new Error("Method not implemented.");
    }
};