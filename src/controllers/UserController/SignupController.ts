/* eslint-disable object-shorthand */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserType } from "../../../data/database/users/UsersModel";
import { getCreateUserUseCase } from "../../../di/registerDependencies";
import { CreateUserUseCase } from "../../../domain/usecases/userUseCases/CreateUserUseCase";
import * as jwtUtil from "../../utils/jwtUtil";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface SignupBody {
  email?: string;
  password?: string;
}

@injectable()
export class SignupController {
  createUserUseCase: CreateUserUseCase;
  constructor() {
    // registerDependencies();
    this.createUserUseCase = getCreateUserUseCase();
  }

  // eslint-disable-next-line prettier/prettier
  signupHandler: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw createHttpError(400, "Insufficient credentials.");
      }

      const passwordHashed = jwtUtil.genPassword(password);

      const userType: UserType = {
        email: email,
        password: passwordHashed,
        fromGoogle: false,
      };

      const userCreated = await this.createUserUseCase.execute(userType);

      if (userCreated) {
        const jwt = jwtUtil.issueJWT(email);

        return res.status(200).json({
          success: true,
          jwt: jwt,
        });
      } else {
        throw createHttpError(500, "Unable to create user.");
      }
    } catch (error) {
      next(error);
    }
  };
}
