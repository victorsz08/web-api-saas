"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListContractRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class ListContractRoute {
    constructor(path, method, listContractService) {
        this.path = path;
        this.method = method;
        this.listContractService = listContractService;
    }
    ;
    static build(listContractService) {
        return new ListContractRoute("/contracts", route_express_1.HttpMethod.GET, listContractService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId, page, createdAtDateIn, createdAtDateOut, scheduleDateIn, scheduleDateOut, status } = request.query;
            const input = {
                userId,
                page,
                createdAtDateIn,
                createdAtDateOut,
                scheduleDateIn,
                scheduleDateOut,
                status
            };
            const data = await this.listContractService.execute(input);
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
            contracts: data.contracts.map((c) => {
                return {
                    id: c.id,
                    number: c.number,
                    local: c.local,
                    scheduleDate: c.scheduleDate,
                    scheduleTime: c.scheduleTime,
                    price: c.price,
                    status: c.status,
                    contact: c.contact,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt
                };
            }),
            totalPages: data.totalPages,
            totalItems: data.totalItems
        };
    }
    ;
}
exports.ListContractRoute = ListContractRoute;
;
