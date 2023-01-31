import { Router } from "express";
import { SignInController } from "../controllers/UserController/SignInController";
import registerDependencies from "../../di/registerDependencies";
import { SignUpController } from "../controllers/UserController/SignUpController";
import { SignOutController } from "../controllers/UserController/SignOutController";
import { authMiddleware } from "../utils/jwtUtil";

const router = Router();

registerDependencies();

router.post("/signup", new SignUpController().signupHandler);

router.post("/signin", new SignInController().signInHandler);

router.delete(
  "/signout",
  authMiddleware,
  new SignOutController().signOutHandler
);

export default router;
