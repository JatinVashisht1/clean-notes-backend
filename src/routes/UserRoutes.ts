import { Router } from "express";
import { SignInController } from "../controllers/UserController/SignInController";
import registerDependencies from "../../di/registerDependencies";
import { SignUpController } from "../controllers/UserController/SignUpController";

const router = Router();

registerDependencies();

router.post("/signup", new SignUpController().signupHandler);

router.post("/signin", new SignInController().signInHandler);

export default router;
