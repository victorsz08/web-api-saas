"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveNoteRoute = void 0;
const route_express_1 = require("../route.express");
const auth_middleware_1 = require("../../../../../middlewares/auth.middleware");
class SaveNoteRoute {
    constructor(path, method, saveNoteService) {
        this.path = path;
        this.method = method;
        this.saveNoteService = saveNoteService;
    }
    ;
    static build(saveNoteService) {
        return new SaveNoteRoute("/notes", route_express_1.HttpMethod.POST, saveNoteService);
    }
    ;
    getHandler() {
        return async (request, response) => {
            const { content, userId } = request.body;
            const input = { content, userId };
            const data = await this.saveNoteService.execute(input);
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
exports.SaveNoteRoute = SaveNoteRoute;
;
