import { PrismaClient } from "@prisma/client";
import { SecurityDto, SecurityGateway } from "../../domain/gateway/security.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";




export class SecurityRepository implements SecurityGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new SecurityRepository(repository);
    };
    
    public async save(userId: string, roleId: string): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

        const role = await this.repository.role.findUnique({ where: { id: roleId }});

        if(!role) {
            throw new ExceptionError("Cargo não encontrado", 404);
        };

        await this.repository.userRoles.create({
            data: {
                role: {
                    connect: {
                        id: role.id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });

        return;
    };

    public async find(userId: string): Promise<SecurityDto> {
        const user = await this.repository.user.findUnique({ 
            where: { 
                id: userId 
            },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if(!user) {
            throw new ExceptionError("Usuário não encontrado", 404);
        };

        return {
            user: {
                id: user.id,
                username: user.username,
                roles: user.userRoles.map((r) => {
                    return {
                        id: r.role.id,
                        name: r.role.name,
                        description: r.role.description
                    }
                })
            }
        };
    };

    public async update(userId: string, roleId: string): Promise<void> {
        const userRole = await this.repository.userRoles.update({
            where: {
                userId: userId
            },
            data: {
                role: {
                    connect: {
                        id: roleId
                    }
                }
            }
        });

        if(!userRole) {
            throw new ExceptionError("Security not found", 400);
        };

        return;
    };
};