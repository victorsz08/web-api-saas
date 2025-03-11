import { UserEntity } from "../entities/user.entity";


export interface AuthGateway {
    login(username: string, password: string): Promise<string>;
    session(token: string): Promise<UserEntity>;
};