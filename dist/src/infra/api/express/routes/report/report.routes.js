"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const prisma_1 = require("../../../../../package/prisma/prisma");
const find_usecase_1 = require("../../../../../usecase/reports/find.usecase");
const report_repository_prisma_1 = require("../../../../repositories/report.repository.prisma");
const find_express_route_1 = require("./find.express.route");
const reportRepository = report_repository_prisma_1.ReportRepository.build(prisma_1.prisma);
const findReportUsecase = find_usecase_1.FindReportUsecase.build(reportRepository);
const findReportRoute = find_express_route_1.FindReportRoute.build(findReportUsecase);
exports.reportRoutes = [findReportRoute];
