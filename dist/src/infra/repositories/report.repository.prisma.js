"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const report_entity_1 = require("../../domain/entities/report.entity");
const date_fns_1 = require("date-fns");
const exception_error_1 = require("../../package/exception-error/exception.error");
class ReportRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new ReportRepository(repository);
    }
    ;
    async find(userId, startDate, endDate) {
        const sales = await this.repository.contract.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: (0, date_fns_1.startOfDay)(startDate).toISOString(),
                    lte: (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(startDate), 1).toISOString()
                }
            }
        });
        if (sales.length === 0) {
            throw new exception_error_1.ExceptionError("Vendas não llocalizadas nesse período", 404);
        }
        ;
        const salesConected = sales.filter(s => s.status === "CONECTADO").length;
        const salesPendding = sales.filter(s => s.status === "PENDENTE").length;
        const salesCancelled = sales.filter(s => s.status === "CANCELADO").length;
        const revenue = parseFloat(sales.reduce((total, s) => s.price + total, 0).toFixed(2));
        const completionRate = parseInt((salesConected / (salesConected + salesPendding) * 100).toFixed(0));
        const cancelledRate = parseInt((salesConected / (salesConected + salesPendding) * 100).toFixed(0));
        return report_entity_1.ReportEntity.with({
            sales: sales.length,
            revenue: revenue,
            installed: salesConected,
            pending: salesPendding,
            canceled: salesCancelled,
            completionRate: completionRate,
            cancellationRate: cancelledRate
        });
    }
    ;
}
exports.ReportRepository = ReportRepository;
;
