import { NextFunction, Response, Request } from "express";
import { ExceptionError } from "../package/exception-error/exception.error";



export function apiError(
        error: Error & Partial<ExceptionError>, 
        request: Request, 
        response: Response, 
        next: NextFunction
    ): void{
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : "Internal server error";
    
        response.status(statusCode).send({ status: statusCode, error: message });
};