import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthGateway } from "../../domain/gateway/auth.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";
import { compare } from "bcryptjs";
import { decode, sign, verify } from "jsonwebtoken";
import { jsonSecret } from "../../../prisma/config/config";




export class AuthRespository implements AuthGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new AuthRespository(repository);
    };
    
    public async login(username: string, password: string): Promise<string> {
        const user = await this.repository.user.findUnique({ where: { username }});

        if(!user) {
            throw new ExceptionError("username ou senha incorretos", 404);
        };

        const comparePassword = await compare(password, user.password);

        if(!comparePassword) {
            throw new ExceptionError("username ou senha incorretos", 404);
        };

        const payload = sign({
            id: user.id
        }, jsonSecret.secret, { expiresIn: "1d" });

        return payload;
    };

    public async session(token: string): Promise<UserEntity> {
        const [_bearer, accessToken] = token.split(" ");

        verify(accessToken, jsonSecret.secret);
        const accessTokendecoded =  decode(accessToken) as UserEntity;

        const user = await this.repository.user.findUnique({ where: { id: accessTokendecoded.id }});
        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        }

        return UserEntity.with({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    };
};