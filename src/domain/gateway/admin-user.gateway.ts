

export interface AdminUserGateway {
    recovery(id: string): Promise<string>;
    delete(id: string): Promise<void>;
};