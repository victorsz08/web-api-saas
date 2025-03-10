
export type SecurityDto = {
    user: {
        id: string;
        username: string;
        roles: {
            id: string;
            name: string;
            description: string;
        }[];
    };
}


export interface SecurityGateway {
    save(userId: string, roleId: string): Promise<void>;
    find(userId: string): Promise<SecurityDto>;
    update(userId: string, roleId: string): Promise<void>;
};