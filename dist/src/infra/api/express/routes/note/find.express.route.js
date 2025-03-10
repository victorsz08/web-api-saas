"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNoteRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class FindNoteRoute {
    constructor(path, method, findNoteService) {
        this.path = path;
        this.method = method;
        this.findNoteService = findNoteService;
    }
    ;
    static build(findNoteService) {
        return new FindNoteRoute("/notes/:id", route_express_1.HttpMethod.GET, findNoteService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id };
            const data = await this.findNoteService.execute(input);
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
            id: data.id,
            content: data.content,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    ;
}
exports.FindNoteRoute = FindNoteRoute;
;
