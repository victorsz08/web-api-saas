"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindReportUsecase = void 0;
class FindReportUsecase {
    constructor(reportGateway) {
        this.reportGateway = reportGateway;
    }
    ;
    static build(reportGateway) {
        return new FindReportUsecase(reportGateway);
    }
    ;
    async execute(input) {
        const { userId, startDate, endDate } = input;
        const aReport = await this.reportGateway.find(userId, startDate, endDate);
        const output = this.present(aReport);
        return output;
    }
    ;
    present(data) {
        return {
            revenue: data.revenue,
            sales: data.sales,
            installed: data.installed,
            pending: data.pending,
            canceled: data.canceled,
            completionRate: data.completionRate,
            cancellationRate: data.cancellationRate
        };
    }
}
exports.FindReportUsecase = FindReportUsecase;
;
