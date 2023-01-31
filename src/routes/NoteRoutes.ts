import { Router } from "express";
import { CreateNoteController } from "../controllers/NoteController/CreateNoteController";
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

export default router;
