import { prisma } from "../../../../../package/prisma/prisma";
import { AuthLoginUsecase } from "../../../../../usecase/auth/login.usecase";
import { AuthSessionUsecase } from "../../../../../usecase/auth/session.usecase";
import { AuthRespository } from "../../../../repositories/auth.repository.prisma";
import { AuthLoginRoute } from "./login.express.route";
import { AuthSessionRoute } from "./session.express.route";


const authRepository = AuthRespository.build(prisma);

const authLoginUsecase = AuthLoginUsecase.build(authRepository);
const authSessionUsecase = AuthSessionUsecase.build(authRepository);

const authLoginRoute = AuthLoginRoute.build(authLoginUsecase);
const authSessionRoute = AuthSessionRoute.build(authSessionUsecase);

export const authRoutes = [
    authLoginRoute,
    authSessionRoute
];