import { prisma } from "../../../../../package/prisma/prisma";
import { FindSecurityUsecase } from "../../../../../usecase/security/find.usecase";
import { SaveSecurityUsecase } from "../../../../../usecase/security/save.usecase";
import { UpdateSecurityUsecase } from "../../../../../usecase/security/update.usecase";
import { SecurityRepository } from "../../../../repositories/security.repository.prisma";
import { FindSecurityRoute } from "./find.express.route";
import { SaveSecurityRoute } from "./save.express.route";
import { UpdateSecurityRoute } from "./update.express.route";


const securityRepository = SecurityRepository.build(prisma);

const saveSecurityUsecase = SaveSecurityUsecase.build(securityRepository);
const findSecurityUsecase = FindSecurityUsecase.build(securityRepository);
const updateSecurityUsecase = UpdateSecurityUsecase.build(securityRepository);

const saveSecurityRoute = SaveSecurityRoute.build(saveSecurityUsecase);
const findSecurityRoute = FindSecurityRoute.build(findSecurityUsecase);
const updateSecurityRoute = UpdateSecurityRoute.build(updateSecurityUsecase);

export const securityRoutes = [ saveSecurityRoute, findSecurityRoute, updateSecurityRoute ];