import { Request, Response, NextFunction } from "express";


export function auth() {
    return async (request: Request, resposne: Response, nextFunction: NextFunction) => {
        nextFunction();
    };
};