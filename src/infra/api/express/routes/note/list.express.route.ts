import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListNoteInputDto, ListNoteOutputDto, ListNoteUsecase } from "../../../../../usecase/note/list.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";


export type ListNoteResponseDto = {
    notes: {
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};

export class ListNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listNoteService: ListNoteUsecase
    ) {};

    public static build(listNoteService: ListNoteUsecase) {
        return new ListNoteRoute("/notes", HttpMethod.GET, listNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId, page,  startDate, endDate } = request.query as Record<string, any>;
            const input: ListNoteInputDto = { userId, page, startDate, endDate };

            try {
                const data = await this.listNoteService.execute(input);
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

    private present(data: ListNoteOutputDto): ListNoteResponseDto {
        return {
            notes: data.notes.map((n) => {
                return {
                    id: n.id,
                    content: n.content,
                    userId: n.userId,
                    createdAt: n.createdAt,
                    updatedAt: n.updatedAt
                }
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    };
};