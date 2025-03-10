"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindContractRoute {
    constructor(path, method, findContractService) {
        this.path = path;
        this.method = method;
        this.findContractService = findContractService;
    }
    ;
    static build(findContractService) {
        return new FindContractRoute("/contracts/:id", route_express_1.HttpMethod.GET, findContractService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id };
            const data = await this.findContractService.execute(input);
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
    getMiddleware() {
        return [(0, auth_middleware_1.auth)()];
    }
    ;
    present(data) {
        return {
            id: data.id,
            number: data.number,
            local: data.local,
            scheduleDate: data.scheduleDate,
            scheduleTime: data.scheduleTime,
            price: data.price,
            status: data.status,
            contact: data.contact,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    ;
}
exports.FindContractRoute = FindContractRoute;
;
