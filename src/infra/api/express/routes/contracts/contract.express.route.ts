import { prisma } from "../../../../../package/prisma/prisma";
import { DeleteContractUsecase } from "../../../../../usecase/contract/delete.usecase";
import { FindContractUsecase } from "../../../../../usecase/contract/find.usecase";
import { ListContractUsecase } from "../../../../../usecase/contract/list.usecase";
import { SaveContractUsecase } from "../../../../../usecase/contract/save.usecase";
import { UpdateScheduleUsecase } from "../../../../../usecase/contract/update-schedule.usecase";
import { UpdateStatusUsecase } from "../../../../../usecase/contract/update-status.usecase";
import { UpdateContractUsecase } from "../../../../../usecase/contract/update.usecase";
import { ContractRepository } from "../../../../repositories/contract.repository.prisma";
import { DeleteContractRoute } from "./delete.express.route";
import { FindContractRoute } from "./find.express.route";
import { ListContractRoute } from "./list.express.route";
import { SaveContractRoute } from "./save.express.route";
import { UpdateScheduleRoute } from "./update-schedule.express.route";
import { UpdateStatusRoute } from "./update-status.express.route";
import { UpdateContractRoute } from "./update.express.route";


const contractRepository = ContractRepository.build(prisma);

const saveContractUsecase = SaveContractUsecase.build(contractRepository);
const findContractUsecase = FindContractUsecase.build(contractRepository);
const listContractUsecase = ListContractUsecase.build(contractRepository);
const updateContractUsecase = UpdateContractUsecase.build(contractRepository);
const updateStatusUsecase = UpdateStatusUsecase.build(contractRepository);
const updateScheduleUsecase = UpdateScheduleUsecase.build(contractRepository);
const deleteContractUsecase = DeleteContractUsecase.build(contractRepository);

const saveContractRoute = SaveContractRoute.build(saveContractUsecase);
const findContractRoute = FindContractRoute.build(findContractUsecase);
const listContractRoute = ListContractRoute.build(listContractUsecase);
const updateContractRoute = UpdateContractRoute.build(updateContractUsecase);
const updateStatusRoute = UpdateStatusRoute.build(updateStatusUsecase);
const updateScheduleRoute = UpdateScheduleRoute.build(updateScheduleUsecase);
const deleteContractRoute = DeleteContractRoute.build(deleteContractUsecase);

export const contractRoutes = [ 
    saveContractRoute, 
    findContractRoute, 
    listContractRoute, 
    updateContractRoute, 
    updateStatusRoute,
    updateScheduleRoute,
    deleteContractRoute 
];
