"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSecurityRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateSecurityRoute {
    constructor(path, method, updateSecurityService) {
        this.path = path;
        this.method = method;
        this.updateSecurityService = updateSecurityService;
    }
    ;
    static build(updateSecurityService) {
        return new UpdateSecurityRoute("/security/:userId", route_express_1.HttpMethod.PUT, updateSecurityService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId } = request.params;
            const { roleId } = request.body;
            const input = { userId, roleId };
            await this.updateSecurityService.execute(input);
            return response.status(200).send();
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
}
exports.UpdateSecurityRoute = UpdateSecurityRoute;
;
