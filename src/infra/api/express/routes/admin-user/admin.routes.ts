import { prisma } from "../../../../../package/prisma/prisma";
import { DeleteUserUsecase } from "../../../../../usecase/admin/delete.usecase";
import { RecoveryUserUsecase } from "../../../../../usecase/admin/recovery.usecase";
import { AdminUserRepository } from "../../../../repositories/admin-user.repository.prisma";
import { DeleteUserRoute } from "./delete.express.route";
import { RecoveryUserRoute } from "./recovery-user.express.route";


const adminUserRepository = AdminUserRepository.build(prisma);

const recoveryUserUsecase = RecoveryUserUsecase.build(adminUserRepository);
const deleteUserUsecase = DeleteUserUsecase.buid(adminUserRepository);

const recoveryUserRoute = RecoveryUserRoute.build(recoveryUserUsecase);
const deleteUserRoute = DeleteUserRoute.build(deleteUserUsecase);

export const adminRoutes = [ recoveryUserRoute, deleteUserRoute ];