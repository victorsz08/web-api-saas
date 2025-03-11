import { PrismaClient } from "@prisma/client";
import { ReportEntity } from "../../domain/entities/report.entity";
import { ReportGateway } from "../../domain/gateway/report.gateway";
import { addDays, startOfDay } from "date-fns";
import { ExceptionError } from "../../package/exception-error/exception.error";




export class ReportRepository implements ReportGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new ReportRepository(repository);
    };
    
    public async find(userId: string, startDate: Date, endDate: Date): Promise<ReportEntity> {
        
        const sales = await this.repository.contract.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: startOfDay(startDate).toISOString(),
                    lte: addDays(startOfDay(startDate), 1).toISOString()
                }
            }
        });

        if(sales.length === 0) {
            throw new ExceptionError("Vendas não llocalizadas nesse período", 404);
        };

        const salesConected: number = sales.filter(s => s.status === "CONECTADO").length;
        const salesPendding: number = sales.filter(s => s.status === "PENDENTE").length;
        const salesCancelled: number = sales.filter(s => s.status === "CANCELADO").length;
        const revenue: number = parseFloat(sales.reduce((total, s) => s.price + total, 0).toFixed(2));
        const completionRate: number = parseInt((salesConected / (salesConected + salesPendding) * 100).toFixed(0));
        const cancelledRate: number = parseInt((salesConected / (salesConected + salesPendding) * 100).toFixed(0));

        return ReportEntity.with({
            sales: sales.length,
            revenue: revenue,
            installed: salesConected,
            pending: salesPendding,
            canceled: salesCancelled,
            completionRate: completionRate,
            cancellationRate: cancelledRate 
        });
    };
};