import { prisma } from "../../../../../package/prisma/prisma";
import { FindNoteUsecase } from "../../../../../usecase/note/find.usecase";
import { ListNoteUsecase } from "../../../../../usecase/note/list.usecase";
import { SaveNoteUsecase } from "../../../../../usecase/note/save.usecase";
import { UpdateNoteUsecase } from "../../../../../usecase/note/update.usecase";
import { NoteRepository } from "../../../../repositories/note.repository.prisma";
import { ListUserRoute } from "../user/list.express.route";
import { FindNoteRoute } from "./find.express.route";
import { ListNoteRoute } from "./list.express.route";
import { SaveNoteRoute } from "./save.express.route";
import { UpdateNoteRoute } from "./update.express.route";




const noteRepository = NoteRepository.build(prisma);

const saveNoteUsecase = SaveNoteUsecase.build(noteRepository);
const findNoteUsecase = FindNoteUsecase.build(noteRepository);
const listNoteUsecase = ListNoteUsecase.build(noteRepository);
const updateNoteUsecase = UpdateNoteUsecase.build(noteRepository);

const saveNoteRoute = SaveNoteRoute.build(saveNoteUsecase);
const listNoteRoute = ListNoteRoute.build(listNoteUsecase);
const findNoteRoute = FindNoteRoute.build(findNoteUsecase);
const updateNoteRoute = UpdateNoteRoute.build(updateNoteUsecase);


export const noteRoutes = [
    saveNoteRoute,
    findNoteRoute,
    listNoteRoute,
    updateNoteRoute
];