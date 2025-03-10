"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRoleRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindRoleRoute {
    constructor(path, method, findRoleService) {
        this.path = path;
        this.method = method;
        this.findRoleService = findRoleService;
    }
    ;
    static build(findRoleService) {
        return new FindRoleRoute("/roles/:id", route_express_1.HttpMethod.GET, findRoleService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id };
            const data = await this.findRoleService.execute(input);
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
            name: data.name,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    ;
}
exports.FindRoleRoute = FindRoleRoute;
;
