import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindNoteInputDto, FindNoteOutputDto, FindNoteUsecase } from "../../../../../usecase/note/find.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type FindNoteResponseDto = {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findNoteService: FindNoteUsecase
    ) {};

    public static build(findNoteService: FindNoteUsecase) {
        return new FindNoteRoute("/notes/:id", HttpMethod.GET, findNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const input: FindNoteInputDto = { id };

            const data = await this.findNoteService.execute(input);
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

    private present(data: FindNoteOutputDto): FindNoteResponseDto {
        return {
            id: data.id,
            content: data.content,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};