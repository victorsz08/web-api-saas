"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContractUsecase = void 0;
class UpdateContractUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new UpdateContractUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const { id, number, local, price, contact } = input;
        const aContract = await this.contractGateway.find(id);
        await this.contractGateway.update(id, number, local, price, contact);
        const output = this.present(aContract);
        return output;
    }
    ;
    present(data) {
        return {
            id: data.id
        };
    }
    ;
}
exports.UpdateContractUsecase = UpdateContractUsecase;
;
