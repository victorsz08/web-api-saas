import { v4 as uuid } from 'uuid';


export type UserEntityProps = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export class UserEntity {

    private constructor(private readonly props: UserEntityProps) {};

    public static build(username: string, firstName: string, lastName: string, password: string) {
        return new UserEntity({
            id: uuid(),
            username,
            firstName,
            lastName,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public static with(props: UserEntityProps) {
        return new UserEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get username() {
        return this.props.username;
    };

    public get firstName() {
        return this.props.firstName;
    };

    public get lastName() {
        return this.props.lastName;
    };

    public get password() {
        return this.props.password;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};