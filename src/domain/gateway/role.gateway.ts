import { RoleEntity } from "../entities/role.entity";


export interface RoleGateway {
    save(role: RoleEntity): Promise<void>;
    find(id: string): Promise<RoleEntity>;
    list(search?: string): Promise<RoleEntity[]>;
    update(id:string, name: string, description: string): Promise<void>;
};