"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContractRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateContractRoute {
    constructor(path, method, updateContractService) {
        this.path = path;
        this.method = method;
        this.updateContractService = updateContractService;
    }
    ;
    static build(updateContractService) {
        return new UpdateContractRoute("/contracts/:id", route_express_1.HttpMethod.PUT, updateContractService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { number, local, price, contact } = request.body;
            const input = { id, number, local, price, contact };
            const data = await this.updateContractService.execute(input);
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
exports.UpdateContractRoute = UpdateContractRoute;
;
