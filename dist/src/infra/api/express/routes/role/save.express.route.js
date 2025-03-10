"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveRoleRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class SaveRoleRoute {
    constructor(path, method, saveRoleService) {
        this.path = path;
        this.method = method;
        this.saveRoleService = saveRoleService;
    }
    ;
    static build(saveRoleService) {
        return new SaveRoleRoute("/roles", route_express_1.HttpMethod.POST, saveRoleService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { name, description } = request.body;
            const input = { name, description };
            const data = await this.saveRoleService.execute(input);
            const responseBody = this.present(data);
            return response.status(201).json(responseBody).send();
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
exports.SaveRoleRoute = SaveRoleRoute;
;
