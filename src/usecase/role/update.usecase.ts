import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleGateway } from "../../domain/gateway/role.gateway";
import { Usecase } from "../usecase";



export type UpdateRoleInputDto = {
    id: string;
    name: string;
    description: string;
};

export type UpdateRoleOutputDto = {
    id: string;
};

export class UpdateRoleUsecase implements Usecase<UpdateRoleInputDto, UpdateRoleOutputDto> {
    
    private constructor(private readonly roleGateway: RoleGateway) {};

    public static build(roleGateway: RoleGateway) {
        return new UpdateRoleUsecase(roleGateway);
    };
    
    public async execute(input: UpdateRoleInputDto): Promise<UpdateRoleOutputDto> {
        const { id, name, description } = input;
        const aRole = await this.roleGateway.find(id);

        await this.roleGateway.update(id, name, description);
        const output = this.present(aRole);

        return output;
    };

    private present(role: RoleEntity): UpdateRoleOutputDto {
        return {
            id: role.id
        };
    };
};