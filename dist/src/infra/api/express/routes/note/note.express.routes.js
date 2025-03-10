"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = void 0;
const prisma_1 = require("../../../../../package/prisma/prisma");
const find_usecase_1 = require("../../../../../usecase/note/find.usecase");
const list_usecase_1 = require("../../../../../usecase/note/list.usecase");
const save_usecase_1 = require("../../../../../usecase/note/save.usecase");
const update_usecase_1 = require("../../../../../usecase/note/update.usecase");
const note_repository_prisma_1 = require("../../../../repositories/note.repository.prisma");
const find_express_route_1 = require("./find.express.route");
const list_express_route_1 = require("./list.express.route");
const save_express_route_1 = require("./save.express.route");
const update_express_route_1 = require("./update.express.route");
const noteRepository = note_repository_prisma_1.NoteRepository.build(prisma_1.prisma);
const saveNoteUsecase = save_usecase_1.SaveNoteUsecase.build(noteRepository);
const findNoteUsecase = find_usecase_1.FindNoteUsecase.build(noteRepository);
const listNoteUsecase = list_usecase_1.ListNoteUsecase.build(noteRepository);
const updateNoteUsecase = update_usecase_1.UpdateNoteUsecase.build(noteRepository);
const saveNoteRoute = save_express_route_1.SaveNoteRoute.build(saveNoteUsecase);
const listNoteRoute = list_express_route_1.ListNoteRoute.build(listNoteUsecase);
const findNoteRoute = find_express_route_1.FindNoteRoute.build(findNoteUsecase);
const updateNoteRoute = update_express_route_1.UpdateNoteRoute.build(updateNoteUsecase);
exports.noteRoutes = [
    saveNoteRoute,
    findNoteRoute,
    listNoteRoute,
    updateNoteRoute
];
