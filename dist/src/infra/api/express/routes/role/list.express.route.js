"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRoleRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
const access_controll_middleware_1 = require("../../../../../middlewares/access-controll.middleware");
class ListRoleRoute {
    constructor(path, method, listRoleService) {
        this.path = path;
        this.method = method;
        this.listRoleService = listRoleService;
    }
    ;
    static build(listRoleService) {
        return new ListRoleRoute("/roles", route_express_1.HttpMethod.GET, listRoleService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { search } = request.query;
            const input = { search };
            const data = await this.listRoleService.execute(input);
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
        return [(0, auth_middleware_1.auth)(), (0, access_controll_middleware_1.accessControll)(access_controll_middleware_1.RoleType.ADMIN)];
    }
    ;
    present(data) {
        return {
            roles: data.roles.map((role) => {
                return {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                    createdAt: role.createdAt,
                    updatedAt: role.updatedAt
                };
            })
        };
    }
    ;
}
exports.ListRoleRoute = ListRoleRoute;
;
