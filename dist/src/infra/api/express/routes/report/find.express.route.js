"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindReportRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindReportRoute {
    constructor(path, method, findReportService) {
        this.path = path;
        this.method = method;
        this.findReportService = findReportService;
    }
    ;
    static build(findReportService) {
        return new FindReportRoute("/reports", route_express_1.HttpMethod.GET, findReportService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId, startDate, endDate } = request.query;
            const input = { userId, startDate, endDate };
            const data = await this.findReportService.execute(input);
            const responseBody = this.present(data);
            return response.status(200).json(responseBody).send();
        };
    }
    ;
    getPath() {
        return this.path;
    }
    ;
    getMethod() {
        return this.method;
    }
    ;
    getMiddleware() {
        return [(0, auth_middleware_1.auth)()];
    }
    ;
    present(data) {
        return {
            sales: data.sales,
            revenue: data.revenue,
            installed: data.installed,
            pending: data.pending,
            canceled: data.canceled,
            completionRate: data.completionRate,
            cancellationRate: data.cancellationRate
        };
    }
    ;
}
exports.FindReportRoute = FindReportRoute;
;
