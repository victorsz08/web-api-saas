import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveUserInputDto, SaveUserOutputDto, SaveUserUsecase } from "../../../../../usecase/user/save.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type SaveUserResponseDto = {
    id: string;
};


export class SaveUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveUserService: SaveUserUsecase
    ) {};

    public static build(saveUserService: SaveUserUsecase) {
        return new SaveUserRoute("/admin/users", HttpMethod.POST, saveUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { username, firstName, lastName, password } = request.body;
            const input: SaveUserInputDto = { username, firstName, lastName, password };

            const data = await this.saveUserService.execute(input);
            const responseBody = this.present(data);

            return response.status(201).json(responseBody).send();
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware(): Array<any> {
        return [ auth() ]
    }

    private present(data: SaveUserOutputDto): SaveUserResponseDto {
        return {
            id: data.id
        };
    };
};