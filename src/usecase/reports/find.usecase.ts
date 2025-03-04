import { ReportEntity } from "../../domain/entities/report.entity";
import { ReportGateway } from "../../domain/gateway/report.gateway";
import { Usecase } from "../usecase";


export type FindReportInputDto = {
    userId: string;
    startDate: Date;
    endDate: Date; 
};


export type FindReportOutputDto = {
    revenue: number; 
    sales: number;
    installed: number;
    pending: number;
    canceled: number;
    completionRate: number;
    cancellationRate: number;
};


export class FindReportUsecase implements Usecase<FindReportInputDto, FindReportOutputDto> {
    
    private constructor(private readonly reportGateway: ReportGateway) {};

    public static build(reportGateway: ReportGateway) {
        return new FindReportUsecase(reportGateway);
    };
    
    public async execute(input: FindReportInputDto): Promise<FindReportOutputDto> {
        const { userId, startDate, endDate } = input;
        const aReport = await this.reportGateway.find(userId, startDate, endDate);

        const output = this.present(aReport);
        return output;
    };

    private present(data: ReportEntity): FindReportOutputDto {
        return {
            revenue: data.revenue,
            sales: data.sales,
            installed: data.installed,
            pending: data.pending,
            canceled: data.canceled,
            completionRate: data.completionRate,
            cancellationRate: data.cancellationRate
        }
    }
};