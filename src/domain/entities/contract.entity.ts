import { v4 as uuid } from "uuid";

export type StatusType = "Pendente" | "Conectado" | "Cancelado";

export const StatusType = {
    PENDENTE: "Pendente" as StatusType,
    CONECTADO: "Conectado" as StatusType,
    CANCELADO: "Cancelado" as StatusType
} as const;

export type ContractEntityProps = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    price: number;
    status: StatusType;
    userId: string;
    contact: string;
    createdAt: Date;
    updatedAt: Date;
};

export class ContractEntity {

    private constructor(private readonly props: ContractEntityProps) {};

    public static build(
        number: number, 
        local: string, 
        scheduleDate: Date, 
        scheduleTime: string, 
        price: number,
        contact: string,
        userId: string
    ) {
        return new ContractEntity({
            id: uuid(),
            number,
            local,
            scheduleDate,
            scheduleTime,
            price,
            contact,
            status: StatusType.PENDENTE,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public static with(props: ContractEntityProps) {
        return new ContractEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get number() {
        return this.props.number;
    };

    public get local() {
        return this.props.local;
    };

    public get scheduleDate() {
        return this.props.scheduleDate;
    };

    public get scheduleTime() {
        return this.props.scheduleTime;
    };

    public get price() {
        return this.props.price;
    };

    public get status() {
        return this.props.status;
    };

    public get contact() {
        return this.props.contact;
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