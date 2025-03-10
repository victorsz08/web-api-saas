"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRoutes = void 0;
const prisma_1 = require("../../../../../package/prisma/prisma");
const delete_usecase_1 = require("../../../../../usecase/contract/delete.usecase");
const find_usecase_1 = require("../../../../../usecase/contract/find.usecase");
const list_usecase_1 = require("../../../../../usecase/contract/list.usecase");
const save_usecase_1 = require("../../../../../usecase/contract/save.usecase");
const update_schedule_usecase_1 = require("../../../../../usecase/contract/update-schedule.usecase");
const update_status_usecase_1 = require("../../../../../usecase/contract/update-status.usecase");
const update_usecase_1 = require("../../../../../usecase/contract/update.usecase");
const contract_repository_prisma_1 = require("../../../../repositories/contract.repository.prisma");
const delete_express_route_1 = require("./delete.express.route");
const find_express_route_1 = require("./find.express.route");
const list_express_route_1 = require("./list.express.route");
const save_express_route_1 = require("./save.express.route");
const update_schedule_express_route_1 = require("./update-schedule.express.route");
const update_status_express_route_1 = require("./update-status.express.route");
const update_express_route_1 = require("./update.express.route");
const contractRepository = contract_repository_prisma_1.ContractRepository.build(prisma_1.prisma);
const saveContractUsecase = save_usecase_1.SaveContractUsecase.build(contractRepository);
const findContractUsecase = find_usecase_1.FindContractUsecase.build(contractRepository);
const listContractUsecase = list_usecase_1.ListContractUsecase.build(contractRepository);
const updateContractUsecase = update_usecase_1.UpdateContractUsecase.build(contractRepository);
const updateStatusUsecase = update_status_usecase_1.UpdateStatusUsecase.build(contractRepository);
const updateScheduleUsecase = update_schedule_usecase_1.UpdateScheduleUsecase.build(contractRepository);
const deleteContractUsecase = delete_usecase_1.DeleteContractUsecase.build(contractRepository);
const saveContractRoute = save_express_route_1.SaveContractRoute.build(saveContractUsecase);
const findContractRoute = find_express_route_1.FindContractRoute.build(findContractUsecase);
const listContractRoute = list_express_route_1.ListContractRoute.build(listContractUsecase);
const updateContractRoute = update_express_route_1.UpdateContractRoute.build(updateContractUsecase);
const updateStatusRoute = update_status_express_route_1.UpdateStatusRoute.build(updateStatusUsecase);
const updateScheduleRoute = update_schedule_express_route_1.UpdateScheduleRoute.build(updateScheduleUsecase);
const deleteContractRoute = delete_express_route_1.DeleteContractRoute.build(deleteContractUsecase);
exports.contractRoutes = [
    saveContractRoute,
    findContractRoute,
    listContractRoute,
    updateContractRoute,
    updateStatusRoute,
    updateScheduleRoute,
    deleteContractRoute
];
