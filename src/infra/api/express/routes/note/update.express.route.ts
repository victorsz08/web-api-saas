import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateNoteInputDto, UpdateNoteOutputDto, UpdateNoteUsecase } from "../../../../../usecase/note/update.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type UpdateNoteResponseDto = {
    id: string;
};


export class UpdateNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateNoteService: UpdateNoteUsecase
    ) {};

    public static build(updateNoteService: UpdateNoteUsecase) {
        return new UpdateNoteRoute("/notes/:id", HttpMethod.PUT, updateNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { content } = request.body;
            const input: UpdateNoteInputDto = { id, content };

            try {
                const data = await this.updateNoteService.execute(input);
                const responseBody = this.present(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof ExceptionError) {
                    return response.status(error.statusCode).json({ status: error.statusCode, error: error.message }).send();
                };

                return response.status(500).json({ status: 500, error: "server internal error" }).send();
            };
        };
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

    private present(data: UpdateNoteOutputDto): UpdateNoteResponseDto {
        return {
            id: data.id
        };
    };
};