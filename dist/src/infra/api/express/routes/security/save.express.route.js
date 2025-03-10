"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSecurityRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class SaveSecurityRoute {
    constructor(path, method, saveSecurityService) {
        this.path = path;
        this.method = method;
        this.saveSecurityService = saveSecurityService;
    }
    ;
    static build(saveSecurityService) {
        return new SaveSecurityRoute("/security", route_express_1.HttpMethod.POST, saveSecurityService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId, roleId } = request.body;
            const input = { userId, roleId };
            await this.saveSecurityService.execute(input);
            return response.status(201).send();
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
exports.SaveSecurityRoute = SaveSecurityRoute;
;
