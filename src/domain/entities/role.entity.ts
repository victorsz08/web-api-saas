import { v4 as uuid } from "uuid";


export type RoleEntityProps = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export class RoleEntity {

    private constructor(private readonly props: RoleEntityProps) {};

    public static build(name: string, description: string) {
        return new RoleEntity({
            id: uuid(),
            name,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public static with(props: RoleEntityProps) {
        return new RoleEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get name() {
        return this.props.name;
    };

    public get description() {
        return this.props.description;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};