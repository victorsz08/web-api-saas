import { UserEntity } from "../entities/user.entity";




export interface UserGateway {
    save(user: UserEntity): Promise<void>;
    find(id: string): Promise<UserEntity>;
    list(search?: string): Promise<UserEntity[]>;
    update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
};