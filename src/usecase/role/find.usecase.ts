import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleGateway } from "../../domain/gateway/role.gateway";
import { Usecase } from "../usecase";


export type FindRoleInputDto = {
    id: string;
};

export type FindRoleOutputDto = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindRoleUsecase implements Usecase<FindRoleInputDto, FindRoleOutputDto> {
    
    private constructor(private readonly roleGateway: RoleGateway) {};
    
    public static build(roleGateway: RoleGateway) {
        return new FindRoleUsecase(roleGateway);
    };

    public async execute(input: FindRoleInputDto): Promise<FindRoleOutputDto> {
        const { id } = input;
        const aRole = await this.roleGateway.find(id);

        const output = this.present(aRole);
        return output;
    };

    private present(role: RoleEntity): FindRoleOutputDto {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
        };
    };
};