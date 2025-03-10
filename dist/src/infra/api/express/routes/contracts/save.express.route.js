"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveContractRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class SaveContractRoute {
    constructor(path, method, saveContractService) {
        this.path = path;
        this.method = method;
        this.saveContractService = saveContractService;
    }
    ;
    static build(saveContractService) {
        return new SaveContractRoute("/contracts", route_express_1.HttpMethod.POST, saveContractService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { number, local, scheduleDate, scheduleTime, contact, price, userId } = request.body;
            const input = { number, local, scheduleDate, scheduleTime, contact, price, userId };
            const data = await this.saveContractService.execute(input);
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
exports.SaveContractRoute = SaveContractRoute;
;
