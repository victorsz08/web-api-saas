"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEntity = exports.StatusType = void 0;
const uuid_1 = require("uuid");
exports.StatusType = {
    PENDENTE: "Pendente",
    CONECTADO: "Conectado",
    CANCELADO: "Cancelado"
};
class ContractEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(number, local, scheduleDate, scheduleTime, price, contact, userId) {
        return new ContractEntity({
            id: (0, uuid_1.v4)(),
            number,
            local,
            scheduleDate,
            scheduleTime,
            price,
            contact,
            status: exports.StatusType.PENDENTE,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new ContractEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get number() {
        return this.props.number;
    }
    ;
    get local() {
        return this.props.local;
    }
    ;
    get scheduleDate() {
        return this.props.scheduleDate;
    }
    ;
    get scheduleTime() {
        return this.props.scheduleTime;
    }
    ;
    get price() {
        return this.props.price;
    }
    ;
    get status() {
        return this.props.status;
    }
    ;
    get contact() {
        return this.props.contact;
    }
    ;
    get userId() {
        return this.props.userId;
    }
    ;
    get createdAt() {
        return this.props.createdAt;
    }
    ;
    get updatedAt() {
        return this.props.updatedAt;
    }
    ;
}
exports.ContractEntity = ContractEntity;
;
