"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = server;
const api_express_1 = require("./infra/api/express/api.express");
const auth_routes_1 = require("./infra/api/express/routes/auth/auth.routes");
const contract_express_route_1 = require("./infra/api/express/routes/contracts/contract.express.route");
const note_express_routes_1 = require("./infra/api/express/routes/note/note.express.routes");
const report_routes_1 = require("./infra/api/express/routes/report/report.routes");
const routes_express_1 = require("./infra/api/express/routes/role/routes.express");
const security_routes_1 = require("./infra/api/express/routes/security/security.routes");
const user_route_1 = require("./infra/api/express/routes/user/user.route");
const routes = [
    ...user_route_1.userRoutes,
    ...contract_express_route_1.contractRoutes,
    ...note_express_routes_1.noteRoutes,
    ...auth_routes_1.authRoutes,
    ...report_routes_1.reportRoutes,
    ...routes_express_1.roleRoutes,
    ...security_routes_1.securityRoutes
];
function server() {
    const api = api_express_1.ApiExpress.build(routes);
    const port = 3000;
    api.start(port);
}
;
server();
