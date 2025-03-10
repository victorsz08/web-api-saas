"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateRoleRoute {
    constructor(path, method, updateRoleService) {
        this.path = path;
        this.method = method;
        this.updateRoleService = updateRoleService;
    }
    ;
    static build(updateRoleService) {
        return new UpdateRoleRoute("/roles/:id", route_express_1.HttpMethod.PUT, updateRoleService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { name, description } = request.body;
            const input = { id, name, description };
            const data = await this.updateRoleService.execute(input);
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
            id: data.id
        };
    }
    ;
}
exports.UpdateRoleRoute = UpdateRoleRoute;
;
