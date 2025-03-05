import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route.express";


export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    };
    
    public static build(routes: Route[]) {
        return new ApiExpress(routes);
    };
    
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log("server http running" );
            this.listRoutes();
        })
    };

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const middlewares = route.getMiddleware?.() || [];

            this.app[method](path, ...middlewares, handler);
        });
    };

    private listRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        });

        console.log(routes);
    };
};