import { Request, Response, NextFunction } from "express";


export type HttpMethod = "post" | "get" | "put" | "delete";

export const HttpMethod = {
    POST: "post" as HttpMethod,
    GET: "get" as HttpMethod,
    PUT: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod
} as const;


export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<any>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddleware?(): Array<any>; 
};