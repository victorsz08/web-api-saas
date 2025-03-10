import { Request, Response, NextFunction } from "express";
import { RoleEntity } from "../domain/entities/role.entity";
import { decode, verify } from "jsonwebtoken";
import { jsonSecret } from "../../prisma/config/config";
import { UserEntity } from "../domain/entities/user.entity";
import { prisma } from "../package/prisma/prisma";

export type RoleType = "admin" | "user";

export const RoleType = {
    ADMIN: "admin" as RoleType,
    USER: "user" as RoleType
} as const;

export function accessControll(role: RoleType) {
    return async (request: Request, response: Response, nextFunction: NextFunction) => {
        const token = request.headers.authorization;

        if(!token) {
            return response.status(401).json({ status: 401, error: "Unauthorized" }).send();
        }

        const [_bearer, accessToken] = token.split(" ");
        verify(accessToken, jsonSecret.secret);

        const userDecoded = decode(accessToken) as UserEntity;
        const security = await prisma.userRoles.findUnique({
            where: {
                userId: userDecoded.id
            },
            include: {
                role: true
            }
        })

        if(!security) {
            return response.status(401).json({ status: 401, error: "Cargo não encontrado" }).send();
        };

        if(security.role.name !== role) {
            return response.status(401).json({ status: 401, error: "Seu cargo não permite acesso a esta rota" }).send();
        };

        nextFunction();
    };
};