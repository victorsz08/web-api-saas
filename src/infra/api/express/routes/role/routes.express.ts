import { prisma } from "../../../../../package/prisma/prisma";
import { FindRoleUsecase } from "../../../../../usecase/role/find.usecase";
import { ListRoleUsecase } from "../../../../../usecase/role/list.usecase";
import { SaveRoleUsecase } from "../../../../../usecase/role/save.usecase";
import { UpdateRoleUsecase } from "../../../../../usecase/role/update.usecase";
import { RoleRepository } from "../../../../repositories/role.repository.prisma";
import { FindRoleRoute } from "./find.express.route";
import { ListRoleRoute } from "./list.express.route";
import { SaveRoleRoute } from "./save.express.route";
import { UpdateRoleRoute } from "./update.express.route";



const roleRepository = RoleRepository.build(prisma);

const saveRoleUsecase = SaveRoleUsecase.build(roleRepository);
const findRoleUsecase = FindRoleUsecase.build(roleRepository);
const listRoleUsecase = ListRoleUsecase.build(roleRepository);
const updateRoleUsecase = UpdateRoleUsecase.build(roleRepository);

const saveRoleRoute = SaveRoleRoute.build(saveRoleUsecase);
const findRoleRoute = FindRoleRoute.build(findRoleUsecase);
const listRoleRoute = ListRoleRoute.build(listRoleUsecase);
const updateRoleRoute = UpdateRoleRoute.build(updateRoleUsecase);

export const roleRoutes = [ saveRoleRoute, findRoleRoute, listRoleRoute, updateRoleRoute ]; 