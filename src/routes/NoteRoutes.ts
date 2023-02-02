import { Router } from "express";
import { CreateNoteController } from "../controllers/NoteController/CreateNoteController";
import { DeleteNoteController } from "../controllers/NoteController/DeleteNoteController";
import { GetAllNotesController } from "../controllers/NoteController/GetAllNotesController";
import { authMiddleware } from "../utils/jwtUtil";

const router = Router();

router.get(
  "/all",
  authMiddleware,
  new GetAllNotesController().getAllNotesHandler
);

router.post(
  "/create",
  authMiddleware,
  new CreateNoteController().createNoteHandler
);

router.delete(
  "/deleteNote",
  authMiddleware,
  new DeleteNoteController().deleteNoteHandler
);

export default router;
