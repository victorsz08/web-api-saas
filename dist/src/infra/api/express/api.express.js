"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../../docs/swagger.json"));
const api_error_middleware_1 = require("../../../middlewares/api-error.middleware");
class ApiExpress {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.addRoutes(routes);
        this.app.use(api_error_middleware_1.apiError);
        this.app.use("/api-docs/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: "*",
            allowedHeaders: "application/json",
            methods: ["GET, POST, PUT, DELETE"]
        }));
    }
    ;
    static build(routes) {
        return new ApiExpress(routes);
    }
    ;
    start(port) {
        this.app.listen(port, () => {
            console.log("server http running");
        });
    }
    ;
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const middlewares = route.getMiddleware?.() || [];
            this.app[method](path, ...middlewares, handler);
        });
    }
    ;
}
exports.ApiExpress = ApiExpress;
;
