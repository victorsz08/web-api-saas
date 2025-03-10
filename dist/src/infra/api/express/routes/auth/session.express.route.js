"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSessionRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class AuthSessionRoute {
    constructor(path, method, authSessionService) {
        this.path = path;
        this.method = method;
        this.authSessionService = authSessionService;
    }
    ;
    static build(authSessionService) {
        return new AuthSessionRoute("/auth/session", route_express_1.HttpMethod.GET, authSessionService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const token = request.headers.authorization;
            const input = { token };
            const data = await this.authSessionService.execute(input);
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
            id: data.id,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName
        };
    }
    ;
}
exports.AuthSessionRoute = AuthSessionRoute;
;
