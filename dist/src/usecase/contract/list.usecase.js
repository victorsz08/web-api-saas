"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListContractUsecase = void 0;
class ListContractUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new ListContractUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const aContracts = await this.contractGateway.list(input);
        const output = this.present(aContracts);
        return output;
    }
    ;
    present(data) {
        return {
            contracts: data.contracts.map((c) => {
                return {
                    id: c.id,
                    number: c.number,
                    local: c.local,
                    scheduleDate: c.scheduleDate,
                    scheduleTime: c.scheduleTime,
                    price: c.price,
                    status: c.status,
                    contact: c.contact,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt
                };
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    }
    ;
}
exports.ListContractUsecase = ListContractUsecase;
;
