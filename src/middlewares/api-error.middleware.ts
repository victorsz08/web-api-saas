import { NextFunction, Response, Request } from "express";
import { ExceptionError } from "../package/exception-error/exception.error";



export function apiError(
        error: Error & Partial<ExceptionError>, 
        request: Request, 
        response: Response, 
        next: NextFunction
    ): any{
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : "Internal server error";
    
        return response.status(statusCode).json({ status: statusCode, error: message }).send();
};