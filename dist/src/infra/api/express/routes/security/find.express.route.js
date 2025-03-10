"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindSecurityRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindSecurityRoute {
    constructor(path, method, findSecurityService) {
        this.path = path;
        this.method = method;
        this.findSecurityService = findSecurityService;
    }
    ;
    static build(findSecurityService) {
        return new FindSecurityRoute("/security/:userId", route_express_1.HttpMethod.GET, findSecurityService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId } = request.params;
            const input = { userId };
            const data = await this.findSecurityService.execute(input);
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
            user: {
                id: data.user.id,
                username: data.user.username,
                roles: data.user.roles.map((r) => {
                    return {
                        id: r.id,
                        name: r.name,
                        description: r.description
                    };
                })
            }
        };
    }
    ;
}
exports.FindSecurityRoute = FindSecurityRoute;
;
