import { RoleEntity } from "../entities/role.entity";


export interface RoleGateway {
    save(role: RoleEntity): Promise<void>;
    find(id: string): Promise<RoleEntity>;
    list(): Promise<RoleEntity[]>;
    update(id:string, name: string, description: string): Promise<void>;
};