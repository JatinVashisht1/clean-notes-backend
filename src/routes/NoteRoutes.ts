import { Router } from "express";
import { CreateNoteController } from "../controllers/NoteController/CreateNoteController";
import { DeleteNoteController } from "../controllers/NoteController/DeleteNoteController";
import { GetAllNotesController } from "../controllers/NoteController/GetAllNotesController";
import { GetNoteByIdController } from "../controllers/NoteController/GetNoteByIdController";
import { UpdateNoteController } from "../controllers/NoteController/UpdateNoteController";
import { authMiddleware } from "../utils/jwtUtil";

const router = Router();

router.get(
  "/all",
  authMiddleware,
  new GetAllNotesController().getAllNotesHandler
);

router.get(
  "/get",
  authMiddleware,
  new GetNoteByIdController().getNoteByIdHandler
);

router.post(
  "/create",
  authMiddleware,
  new CreateNoteController().createNoteHandler
);

router.delete(
  "/delete",
  authMiddleware,
  new DeleteNoteController().deleteNoteHandler
);

router.put(
  "/update",
  authMiddleware,
  new UpdateNoteController().updateNoteHandler
);

export default router;
