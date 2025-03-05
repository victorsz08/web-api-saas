import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleGateway } from "../../domain/gateway/role.gateway";
import { Usecase } from "../usecase";


export type ListRoleInputDto = {
    search?: string;
};

export type ListRoleOutputDto = {
    roles: {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export class ListRoleUsecase implements Usecase<ListRoleInputDto, ListRoleOutputDto> {
    
    private constructor(private readonly roleGateway: RoleGateway) {};
    
    public static build(roleGateway: RoleGateway) {
        return new ListRoleUsecase(roleGateway);
    };

    public async execute(input: ListRoleInputDto): Promise<ListRoleOutputDto> {
        const { search } = input;
        const aRoles = await this.roleGateway.list(search);

        const output = this.present(aRoles);
        return output;
    };

    private present(roles: RoleEntity[]): ListRoleOutputDto {
        return {
            roles: roles.map((r) => {
                return {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    createdAt: r.createdAt,
                    updatedAt: r.updatedAt
                }
            })
        }
    } 
};