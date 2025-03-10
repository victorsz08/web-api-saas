"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindUserRoute {
    constructor(path, method, findUserService) {
        this.path = path;
        this.method = method;
        this.findUserService = findUserService;
    }
    ;
    static build(findUserService) {
        return new FindUserRoute("/users/:id", route_express_1.HttpMethod.GET, findUserService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id };
            const data = await this.findUserService.execute(input);
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
            lastName: data.lastName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    ;
}
exports.FindUserRoute = FindUserRoute;
;
