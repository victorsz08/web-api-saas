import { ApiExpress } from "./infra/api/express/api.express"
import { userRoutes } from "./infra/api/express/routes/user/user.route"

const routes = [...userRoutes];

export function server() {
    const api = ApiExpress.build(routes);
    const port = 3000;

    api.start(port);
};

server()