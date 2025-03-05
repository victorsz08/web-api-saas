import { ApiExpress } from "./infra/api/express/api.express"
import { authRoutes } from "./infra/api/express/routes/auth/auth.routes";
import { contractRoutes } from "./infra/api/express/routes/contracts/contract.express.route";
import { noteRoutes } from "./infra/api/express/routes/note/note.express.routes";
import { reportRoutes } from "./infra/api/express/routes/report/report.routes";
import { userRoutes } from "./infra/api/express/routes/user/user.route"

const routes = [...userRoutes, ...contractRoutes, ...noteRoutes, ...authRoutes, ...reportRoutes ];

export function server() {
    const api = ApiExpress.build(routes);
    const port = 3000;

    api.start(port);
};

server();