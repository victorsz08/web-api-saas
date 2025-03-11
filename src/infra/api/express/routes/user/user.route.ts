import { prisma } from "../../../../../package/prisma/prisma";
import { FindUserUsecase } from "../../../../../usecase/user/find.usecase";
import { ListUserUsecase } from "../../../../../usecase/user/list.usecase";
import { SaveUserUsecase } from "../../../../../usecase/user/save.usecase";
import { UpdateUserUsecase } from "../../../../../usecase/user/update.usecase";
import { UserRepository } from "../../../../repositories/user.repository.prisma";
import { FindUserRoute } from "./find.express.route";
import { ListUserRoute } from "./list.express.route";
import { SaveUserRoute } from "./save.express.route";
import { UpdateUserRoute } from "./update.express.route";



const userRepository = UserRepository.build(prisma);

const saveUserUsecase = SaveUserUsecase.build(userRepository);
const findUserUsecase = FindUserUsecase.build(userRepository);
const listUserUsecase = ListUserUsecase.build(userRepository);
const updateUserUsecase = UpdateUserUsecase.build(userRepository);

const saveUserRoute = SaveUserRoute.build(saveUserUsecase);
const findUserRoute = FindUserRoute.build(findUserUsecase);
const listUserRoute = ListUserRoute.build(listUserUsecase);
const updateUserRoute = UpdateUserRoute.build(updateUserUsecase);

export const userRoutes = [ saveUserRoute, findUserRoute, listUserRoute, updateUserRoute ];