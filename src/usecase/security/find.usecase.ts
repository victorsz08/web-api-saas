import { SecurityDto, SecurityGateway } from "../../domain/gateway/security.gateway";
import { Usecase } from "../usecase";


export type FindSecurityInputDto = {
    userId: string;
};

export type FindSecurityOutputDto = {
    user: {
        id: string;
        username: string;
        roles: {
            id: string;
            name: string;
            description: string;
        }[];
    };
};

export class FindSecurityUsecase implements Usecase<FindSecurityInputDto, FindSecurityOutputDto> {
    
    private constructor(private readonly securityGateway: SecurityGateway) {};

    public static build(securityGateway: SecurityGateway) {
        return new FindSecurityUsecase(securityGateway);
    };
    
    public async execute(input: FindSecurityInputDto): Promise<FindSecurityOutputDto> {
        const { userId } = input;
        const aSecurity = await this.securityGateway.find(userId);

        const output = this.present(aSecurity);

        return output;
    };

    private present(security: SecurityDto): FindSecurityOutputDto {
        return {
            user: {
                id: security.user.id,
                username: security.user.username,
                roles: security.user.roles.map((role) => {
                    return {
                        id:  role.id,
                        name: role.name,
                        description: role.description
                    }
                })
            }
        };
    };
};