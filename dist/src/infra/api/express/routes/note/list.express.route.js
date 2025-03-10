"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoteRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class ListNoteRoute {
    constructor(path, method, listNoteService) {
        this.path = path;
        this.method = method;
        this.listNoteService = listNoteService;
    }
    ;
    static build(listNoteService) {
        return new ListNoteRoute("/notes", route_express_1.HttpMethod.GET, listNoteService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { userId, page, startDate, endDate } = request.query;
            const input = { userId, page, startDate, endDate };
            const data = await this.listNoteService.execute(input);
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
            notes: data.notes.map((n) => {
                return {
                    id: n.id,
                    content: n.content,
                    userId: n.userId,
                    createdAt: n.createdAt,
                    updatedAt: n.updatedAt
                };
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    }
    ;
}
exports.ListNoteRoute = ListNoteRoute;
;
