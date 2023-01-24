import { Router } from "express";
import registerDependencies from "../../di/registerDependencies";
import { SignupController } from "../controllers/UserController/SignupController";

const router = Router();

registerDependencies();
router.post("/signup", new SignupController().signupHandler);

export default router;
