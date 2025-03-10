"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateUserRoute {
    constructor(path, method, updateUserService) {
        this.path = path;
        this.method = method;
        this.updateUserService = updateUserService;
    }
    ;
    static build(updateUserService) {
        return new UpdateUserRoute("/users/:id", route_express_1.HttpMethod.PUT, updateUserService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { username, firstName, lastName } = request.body;
            const input = { id, username, firstName, lastName };
            const data = await this.updateUserService.execute(input);
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
exports.UpdateUserRoute = UpdateUserRoute;
;
