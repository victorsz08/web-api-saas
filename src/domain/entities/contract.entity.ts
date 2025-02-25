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
}