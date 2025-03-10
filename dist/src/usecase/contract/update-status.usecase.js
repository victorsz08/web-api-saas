"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusUsecase = void 0;
class UpdateStatusUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new UpdateStatusUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const { id, status } = input;
        const aContract = await this.contractGateway.find(id);
        await this.contractGateway.updateStatus(id, status);
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
exports.UpdateStatusUsecase = UpdateStatusUsecase;
;
