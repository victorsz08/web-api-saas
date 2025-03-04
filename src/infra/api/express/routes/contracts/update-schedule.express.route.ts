import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateScheduleInputDto, UpdateScheduleOutputDto, UpdateScheduleUsecase } from "../../../../../usecase/contract/update-schedule.usecase";
import { UpdateContractInputDto } from "../../../../../usecase/contract/update.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type UpdateScheduleResponseDto = {
    id: string;
};

export class UpdateScheduleRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateScheduleService: UpdateScheduleUsecase
    ) {};

    public static build(updateScheduleService: UpdateScheduleUsecase) {
        return new UpdateScheduleRoute("/contracts/schedule/:id", HttpMethod.PUT, updateScheduleService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) =>  {
            const { id } = request.params;
            const { scheduleDate, scheduleTime } = request.body as Record<string, any>;
            const input: UpdateScheduleInputDto = { id, scheduleDate, scheduleTime };

            try {
                const data = await this.updateScheduleService.execute(input);
                const responseBody = this.present(data);

                return response.status(200).json(responseBody).send();
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

    private present(data: UpdateScheduleOutputDto): UpdateScheduleResponseDto {
        return {
            id: data.id
        };
    };
};