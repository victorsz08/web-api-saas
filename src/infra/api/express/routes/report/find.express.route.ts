import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindReportInputDto, FindReportOutputDto, FindReportUsecase } from "../../../../../usecase/reports/find.usecase";
import { ExceptionError } from "../../../../../package/exception-error/exception.error";
import { auth } from "../../../../../middlewares/auth.middleware";



export type FindReportResponseDto = {
    revenue: number; 
    sales: number;
    installed: number;
    pending: number;
    canceled: number;
    completionRate: number;
    cancellationRate: number;
};

export class FindReportRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findReportService: FindReportUsecase
    ) {};

    public static build(findReportService: FindReportUsecase) {
        return new FindReportRoute("/reports", HttpMethod.GET, findReportService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId, startDate, endDate } = request.query as Record<string, any>;
            const input: FindReportInputDto = { userId, startDate, endDate };

            const data = await this.findReportService.execute(input);
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

    private present(data: FindReportOutputDto): FindReportResponseDto {
        return {
            sales: data.sales,
            revenue: data.revenue,
            installed: data.installed,
            pending: data.pending,
            canceled: data.canceled,
            completionRate: data.completionRate,
            cancellationRate: data.cancellationRate
        };
    };
};