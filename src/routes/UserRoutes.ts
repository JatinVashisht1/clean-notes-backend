import { Router } from "express";
import { SignInController } from "../controllers/UserController/SignInController";
import registerDependencies from "../../di/registerDependencies";
import { SignupController } from "../controllers/UserController/SignupController";
import { UserModel } from "../../data/database/users/UsersModel";

const router = Router();

registerDependencies();

router.post("/signup", new SignupController().signupHandler);

router.post("/signin", new SignInController().signInHandler);

router.delete("/", async (req, res, _next) => {
  const result = await UserModel.deleteMany({}).exec();

  console.log(`result is ${result}`);

  return res.status(200).json({ success: true });
});

export default router;
