"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const prisma_1 = require("../../../../../package/prisma/prisma");
const login_usecase_1 = require("../../../../../usecase/auth/login.usecase");
const session_usecase_1 = require("../../../../../usecase/auth/session.usecase");
const auth_repository_prisma_1 = require("../../../../repositories/auth.repository.prisma");
const login_express_route_1 = require("./login.express.route");
const session_express_route_1 = require("./session.express.route");
const authRepository = auth_repository_prisma_1.AuthRespository.build(prisma_1.prisma);
const authLoginUsecase = login_usecase_1.AuthLoginUsecase.build(authRepository);
const authSessionUsecase = session_usecase_1.AuthSessionUsecase.build(authRepository);
const authLoginRoute = login_express_route_1.AuthLoginRoute.build(authLoginUsecase);
const authSessionRoute = session_express_route_1.AuthSessionRoute.build(authSessionUsecase);
exports.authRoutes = [
    authLoginRoute,
    authSessionRoute
];
