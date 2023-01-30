import { Router } from "express";
import { GetAllNotesController } from "../controllers/NoteController/GetAllNotesController";
import { authMiddleware } from "../utils/jwtUtil";

const router = Router();

router.get("/", authMiddleware, new GetAllNotesController().getAllNotesHandler);

export default router;
