import { PrismaClient } from "@prisma/client";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleGateway } from "../../domain/gateway/role.gateway";
import { ExceptionError } from "../../package/exception-error/exception.error";





export class RoleRepository implements RoleGateway {
    
    private constructor(private readonly repository: PrismaClient) {};
    
    public static build(repository: PrismaClient) {
        return new RoleRepository(repository);
    };

    public async save(role: RoleEntity): Promise<void> {
        const { id, name, description, createdAt, updatedAt } = role;
        
        await this.repository.role.create({
            data: {
                id,
                name,
                description,
                createdAt,
                updatedAt
            }
        });

        return;
    };

    public async find(id: string): Promise<RoleEntity> {
        const role = await this.repository.role.findUnique({ where: { id }});

        if(!role) {
            throw new ExceptionError("Cargo não encontrado com esse ID", 404);
        };

        return RoleEntity.with({
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
        });
    };

    public async list(search?: string): Promise<RoleEntity[]> {
        const roles = await this.repository.role.findMany({
            where: {
                ...(search && {
                    name: { contains: search, mode: "insensitive" }
                })
            }
        });

        if(roles.length === 0) {
            throw new ExceptionError("Nenhum cargo encontrado", 404);
        };

        const roleList = roles.map((role) => {
            return RoleEntity.with({
                id: role.id,
                name: role.name,
                description: role.description,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt
            });
        });

        return roleList;
    };

    public async update(id: string, name: string, description: string): Promise<void> {
        await this.repository.role.update({
            where: { id },
            data: {
                name, 
                description,
                updatedAt: new Date().toISOString()
            }
        });

        return;
    };
};