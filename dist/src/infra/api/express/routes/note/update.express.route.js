"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class UpdateNoteRoute {
    constructor(path, method, updateNoteService) {
        this.path = path;
        this.method = method;
        this.updateNoteService = updateNoteService;
    }
    ;
    static build(updateNoteService) {
        return new UpdateNoteRoute("/notes/:id", route_express_1.HttpMethod.PUT, updateNoteService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { content } = request.body;
            const input = { id, content };
            const data = await this.updateNoteService.execute(input);
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
exports.UpdateNoteRoute = UpdateNoteRoute;
;
