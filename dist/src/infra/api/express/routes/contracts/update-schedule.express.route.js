"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateScheduleRoute {
    constructor(path, method, updateScheduleService) {
        this.path = path;
        this.method = method;
        this.updateScheduleService = updateScheduleService;
    }
    ;
    static build(updateScheduleService) {
        return new UpdateScheduleRoute("/contracts/schedule/:id", route_express_1.HttpMethod.PUT, updateScheduleService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { scheduleDate, scheduleTime } = request.body;
            const input = { id, scheduleDate, scheduleTime };
            const data = await this.updateScheduleService.execute(input);
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
exports.UpdateScheduleRoute = UpdateScheduleRoute;
;
