"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContractUsecase = void 0;
class DeleteContractUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new DeleteContractUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const { id } = input;
        await this.contractGateway.delete(id);
        return;
    }
    ;
}
exports.DeleteContractUsecase = DeleteContractUsecase;
;
