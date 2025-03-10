"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveContractUsecase = void 0;
const contract_entity_1 = require("../../domain/entities/contract.entity");
class SaveContractUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new SaveContractUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const { number, local, price, scheduleDate, contact, scheduleTime, userId } = input;
        const aContract = contract_entity_1.ContractEntity.build(number, local, scheduleDate, scheduleTime, price, contact, userId);
        await this.contractGateway.save(aContract);
        const output = this.present(aContract);
        return output;
    }
    ;
    present(contract) {
        return {
            id: contract.id
        };
    }
    ;
}
exports.SaveContractUsecase = SaveContractUsecase;
;
