"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContractRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class DeleteContractRoute {
    constructor(path, method, deleteContractService) {
        this.path = path;
        this.method = method;
        this.deleteContractService = deleteContractService;
    }
    ;
    static build(deleteContractService) {
        return new DeleteContractRoute("/contracts/:id", route_express_1.HttpMethod.DELETE, deleteContractService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id };
            await this.deleteContractService.execute(input);
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
exports.DeleteContractRoute = DeleteContractRoute;
;
