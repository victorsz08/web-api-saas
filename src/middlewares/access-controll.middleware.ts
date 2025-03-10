import { Request, Response, NextFunction } from "express";
import { jsonSecret } from "../../prisma/config/config";
import { decode, verify } from "jsonwebtoken";
import { UserEntity } from "../domain/entities/user.entity";
import { prisma } from "../package/prisma/prisma";

export function accessControll(): any {
    return async (request: Request, response: Response, nextFunction: NextFunction) => {
        const token = request.headers.authorization;
        const _dirname = request.path;
        const startDirname: string = _dirname.split("/").filter((dir) => dir !== "")[0];

        console.log(startDirname);

        if(!token) {
            return response.status(401).json({ status: 401, error: "Unauthorized" }).send();
        }

        const [_bearer, accessToken] = token.split(" ");
        verify(accessToken, jsonSecret.secret);

        const decoded = decode(accessToken) as UserEntity;

        const userRole = await prisma.userRoles.findUnique({
            where: {
                userId: decoded.id
            },
            include: {
                role: true
            }
        });

        if(!userRole) {
            return response.status(401).json({ status: 401, error: "Unauthorized" }).send();
        };

        if(_dirname.startsWith("/admin") && userRole.role.name !== "admin") {
            return response.status(401).json({ status: 401, error: "Sem permissão para esta rota" }).send();
        };

        nextFunction();
    };
};