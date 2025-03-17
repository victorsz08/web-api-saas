import { ApiExpress } from "./infra/api/express/api.express"
import { adminRoutes } from "./infra/api/express/routes/admin-user/admin.routes";
import { authRoutes } from "./infra/api/express/routes/auth/auth.routes";
import { contractRoutes } from "./infra/api/express/routes/contracts/contract.express.route";
import { noteRoutes } from "./infra/api/express/routes/note/note.express.routes";
import { reportRoutes } from "./infra/api/express/routes/report/report.routes";
import { roleRoutes } from "./infra/api/express/routes/role/routes.express";
import { securityRoutes } from "./infra/api/express/routes/security/security.routes";
import { userRoutes } from "./infra/api/express/routes/user/user.route"

const routes = [
    ...userRoutes, 
    ...contractRoutes, 
    ...noteRoutes, 
    ...authRoutes, 
    ...reportRoutes, 
    ...roleRoutes,
    ...securityRoutes,
    ...adminRoutes
 ];

export function server() {
    const api = ApiExpress.build(routes);
    const port = 4000;

    api.start(port);
};

server();