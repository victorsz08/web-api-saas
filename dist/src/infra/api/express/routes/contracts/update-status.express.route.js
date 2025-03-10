"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateStatusRoute {
    constructor(path, method, updateStatusService) {
        this.path = path;
        this.method = method;
        this.updateStatusService = updateStatusService;
    }
    ;
    static build(updateStatusService) {
        return new UpdateStatusRoute("/contracts/status/:id", route_express_1.HttpMethod.PUT, updateStatusService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { status } = request.body;
            const input = { id, status };
            const data = await this.updateStatusService.execute(input);
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
exports.UpdateStatusRoute = UpdateStatusRoute;
;
