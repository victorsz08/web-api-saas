import { Request, Response } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindSecurityInputDto, FindSecurityOutputDto, FindSecurityUsecase } from "../../../../../usecase/security/find.usecase";
import { auth } from "../../../../../middlewares/auth.middleware";


export type FindSecurityResponseDto = {
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

export class FindSecurityRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findSecurityService: FindSecurityUsecase
    ) {};

    public static build(findSecurityService: FindSecurityUsecase) {
        return new FindSecurityRoute("/admin/security/:userId", HttpMethod.GET, findSecurityService);
    };

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;
            const input: FindSecurityInputDto = { userId };

            const data = await this.findSecurityService.execute(input);
            const responseBody = this.present(data);

            return response.status(200).json(responseBody).send();
        }
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddleware?(): Array<any> {
        return [ auth() ]
    };

    private present(data: FindSecurityOutputDto): FindSecurityResponseDto {
        return {
            user: {
                id: data.user.id,
                username: data.user.username,
                roles: data.user.roles.map((r) => {
                    return {
                        id: r.id,
                        name: r.name,
                        description: r.description
                    }
                })
            }
        };
    };
};