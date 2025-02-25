import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";
import { hash } from "bcryptjs";




export class UserRepository implements UserGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new UserRepository(repository);
    };
    
    public async save({ id, username, firstName, lastName, password, createdAt, updatedAt }: UserEntity): Promise<void> {
        const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username }});

        if(usernameAlreadyExists) {
            throw new ExceptionError("Username indisponível", 409);
        };

        const passwordHashed = await hash(password, 10);

        const data = {
            id: id, 
            username: username,
            name: firstName,
            lastname: lastName,
            password: passwordHashed,
            createdAt: createdAt,
            updatedAt: updatedAt
        };

        await this.repository.user.create({ data });

        return;
    };

    public async find(id: string): Promise<UserEntity> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

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


    public async list(search?: string): Promise<UserEntity[]> {
        const users = await this.repository.user.findMany({
            where: {
                ...(search && {
                    AND: [
                        { username: { contains: search, mode: "insensitive" }},
                        { name: { contains: search, mode: "insensitive"} },
                        { lastname: { contains: search, mode: "insensitive" }}
                    ]
                })
            }
        });


        if(users.length <= 0) {
            throw new ExceptionError("Usuários não encontrados", 404);
        };

        const userList = users.map((user) => {
            return UserEntity.with({
                id: user.id,
                username: user.username,
                firstName: user.name,
                lastName: user.lastname,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        });

        return userList;
    };

    public async update(id: string, username: string, firstName: string, lastName: string): Promise<void> {
        const user = await this.find(id);

        if(user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username }});

            if(usernameAlreadyExists) {
                throw new ExceptionError("Username indisponível", 409);
            };
        };

        const data = {
            name: firstName,
            lastname: lastName
        }

        await this.repository.user.update({
            where: { id },
            data
        });

        return;
    };
};