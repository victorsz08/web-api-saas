"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class ListUserRoute {
    constructor(path, method, listUserService) {
        this.path = path;
        this.method = method;
        this.listUserService = listUserService;
    }
    ;
    static build(listUserService) {
        return new ListUserRoute("/users", route_express_1.HttpMethod.GET, listUserService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { search } = request.query;
            const input = { search };
            const data = await this.listUserService.execute(input);
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
            users: data.users.map((u) => u)
        };
    }
    ;
}
exports.ListUserRoute = ListUserRoute;
;
