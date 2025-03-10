import "express-async-errors"
import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route.express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "../../../docs/swagger.json";
import { apiError } from "../../../middlewares/api-error.middleware";
import { accessControll } from "../../../middlewares/access-controll.middleware";

export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        
        this.addRoutes(routes);
        this.app.use(apiError);
        this.app.use(accessControll)

        this.app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        
        this.app.use(helmet());
        this.app.use(cors({
            origin: "*",
            allowedHeaders: "application/json",
            methods: ["GET, POST, PUT, DELETE"]
        }));
    };

    public static build(routes: Route[]) {
        return new ApiExpress(routes);
    };
    
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log("server http running");
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
};