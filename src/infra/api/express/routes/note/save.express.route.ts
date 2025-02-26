import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { SaveNoteInputDto, SaveNoteOutputDto, SaveNoteUsecase } from "../../../../../usecase/note/save.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type SaveNoteResponseDto = {
    id: string;
};


export class SaveNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveNoteService: SaveNoteUsecase
    ) {};

    public static build(saveNoteService: SaveNoteUsecase) {
        return new SaveNoteRoute("/notes", HttpMethod.POST, saveNoteService);
    };

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { content, userId } = request.body;
            const input: SaveNoteInputDto = { content, userId };

            try {
                const data = await this.saveNoteService.execute(input);
                const responseBody = this.present(data);

                return response.status(201).json(responseBody).send();
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

    private present(data: SaveNoteOutputDto): SaveNoteResponseDto {
        return {
            id: data.id
        };
    };
};