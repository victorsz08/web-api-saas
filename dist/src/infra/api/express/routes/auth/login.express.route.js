"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginRoute = void 0;
const route_express_1 = require("../route.express");
class AuthLoginRoute {
    constructor(path, method, authLoginService) {
        this.path = path;
        this.method = method;
        this.authLoginService = authLoginService;
    }
    ;
    static build(authLoginService) {
        return new AuthLoginRoute("/auth/login", route_express_1.HttpMethod.POST, authLoginService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { username, password } = request.body;
            const input = { username, password };
            const data = await this.authLoginService.execute(input);
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
    present(data) {
        return {
            token: data.token
        };
    }
    ;
}
exports.AuthLoginRoute = AuthLoginRoute;
;
