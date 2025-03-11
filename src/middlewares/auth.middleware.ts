import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { jsonSecret } from "../../prisma/config/config";


export function auth() {
    return async (request: Request, response: Response, nextFunction: NextFunction) => {
        const token = request.headers.authorization;

        if(!token) {
            return response.status(401).json({ status: 401, error: "Token não encontrado" }).send();
        };

        const [_bearer, accessToken] = token.split(" ");

        try {
            verify(accessToken, jsonSecret.secret);

            nextFunction();
        } catch (error) {
            return response.status(401).json({ status: 401, error: "Usuário não autorizado" }).send()
        };
    };
};