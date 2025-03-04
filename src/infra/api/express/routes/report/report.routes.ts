import { prisma } from "../../../../../package/prisma/prisma";
import { FindReportUsecase } from "../../../../../usecase/reports/find.usecase";
import { ReportRepository } from "../../../../repositories/report.repository.prisma";
import { FindReportRoute } from "./find.express.route";


const reportRepository = ReportRepository.build(prisma);

const findReportUsecase = FindReportUsecase.build(reportRepository);

const findReportRoute = FindReportRoute.build(findReportUsecase);

export const reportRoutes = [ findReportRoute ];