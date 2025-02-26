import { v4 as uuid } from "uuid";


export type NoteEntityProps = {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class NoteEntity {

    private constructor(private readonly props: NoteEntityProps) {};

    public static build(content: string, userId: string) {
        return new NoteEntity({
            id: uuid(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public static with(props: NoteEntityProps) {
        return new NoteEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get content() {
        return this.props.content;
    };

    public get userId() {
        return this.props.userId;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};