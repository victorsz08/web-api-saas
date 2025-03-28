import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateUserInputDto, UpdateUserOutputDto, UpdateUserUsecase } from "../../../../../usecase/user/update.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type UpdateUserResponseDto = {
    id: string;
};


export class UpdateUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUsecase
    ) {};

    public static build(updateUserService: UpdateUserUsecase) {
        return new UpdateUserRoute("/users/:id", HttpMethod.PUT, updateUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { username, firstName, lastName } = request.body;
            const input: UpdateUserInputDto = { id, username, firstName, lastName };
            
            const data = await this.updateUserService.execute(input);
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

    private present(data: UpdateUserOutputDto): UpdateUserResponseDto {
        return {
            id: data.id
        };
    };
};