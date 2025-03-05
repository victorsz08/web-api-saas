import { ReportEntity } from "../entities/report.entity";


export interface ReportGateway {
    find(userId: string, startDate: Date, endDate: Date): Promise<ReportEntity>;
};