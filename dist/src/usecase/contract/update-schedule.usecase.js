"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleUsecase = void 0;
class UpdateScheduleUsecase {
    constructor(contractGateway) {
        this.contractGateway = contractGateway;
    }
    ;
    static build(contractGateway) {
        return new UpdateScheduleUsecase(contractGateway);
    }
    ;
    async execute(input) {
        const { id, scheduleDate, scheduleTime } = input;
        const aContract = await this.contractGateway.find(id);
        await this.contractGateway.updateSchedule(id, scheduleDate, scheduleTime);
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
exports.UpdateScheduleUsecase = UpdateScheduleUsecase;
;
