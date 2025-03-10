"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractUsecase = void 0;
class FindContractUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new FindContractUsecase(contractGateway);
    }
    ;
    async execute({ id }) {
        const aContract = await this.contractGateway.find(id);
        const output = this.present(aContract);
        return output;
    }
    ;
    present(data) {
        return {
            id: data.id,
            number: data.number,
            local: data.local,
            scheduleDate: data.scheduleDate,
            scheduleTime: data.scheduleTime,
            price: data.price,
            status: data.status,
            userId: data.userId,
            contact: data.contact,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    ;
}
exports.FindContractUsecase = FindContractUsecase;
;
