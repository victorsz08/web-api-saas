import { PrismaClient } from "@prisma/client";
import { AdminUserGateway } from "../../domain/gateway/admin-user.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";
import { hash } from "bcryptjs";


export class AdminUserRepository implements AdminUserGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new AdminUserRepository(repository);
    };
    
    public async recovery(id: string): Promise<string> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

        const randomPassword = Math.random().toString(30).slice(-10);
        const passwordHashed = await hash(randomPassword, 10);

        await this.repository.user.update({
            where: {
                id: user.id
            },
            data: {
                password: passwordHashed
            }
        });

        return randomPassword;
    };

    public async delete(id: string): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

        await this.repository.user.delete({ where: { id }});

        return;
    };
};