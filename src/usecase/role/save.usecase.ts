import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleGateway } from "../../domain/gateway/role.gateway";
import { Usecase } from "../usecase";


export type SaveRoleInputDto = {
    name: string;
    description: string;
};

export type SaveRoleOutputDto= {
    id: string;
};

export class SaveRoleUsecase implements Usecase<SaveRoleInputDto, SaveRoleOutputDto> {

    private constructor(private readonly roleGateway: RoleGateway) {};

    public static build(roleGateway: RoleGateway) {
        return new SaveRoleUsecase(roleGateway);
    };

    public async execute(input: SaveRoleInputDto): Promise<SaveRoleOutputDto> {
        const { name, description } = input;
        const aRole = RoleEntity.build(name, description);

        await this.roleGateway.save(aRole);
        const output = this.present(aRole);

        return output;
    };

    private present(role: RoleEntity): SaveRoleOutputDto {
        return {
            id: role.id
        }
    };
};