"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserRoute = void 0;
const route_express_1 = require("../route.express");
class SaveUserRoute {
    constructor(path, method, saveUserService) {
        this.path = path;
        this.method = method;
        this.saveUserService = saveUserService;
    }
    ;
    static build(saveUserService) {
        return new SaveUserRoute("/users", route_express_1.HttpMethod.POST, saveUserService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { username, firstName, lastName, password } = request.body;
            const input = { username, firstName, lastName, password };
            const data = await this.saveUserService.execute(input);
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
        return [];
    }
    ;
    present(data) {
        return {
            id: data.id
        };
    }
    ;
}
exports.SaveUserRoute = SaveUserRoute;
;
