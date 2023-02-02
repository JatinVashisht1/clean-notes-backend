/* eslint-disable object-shorthand */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable, injectable } from "tsyringe";
import { UserType } from "../../../data/database/users/UsersModel";
import { CreateUserUseCase } from "../../../domain/usecases/userUseCases/CreateUserUseCase";
import { InsertTokenUseCase } from "../../../domain/usecases/userUseCases/InsertTokenUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";
import * as jwtUtil from "../../utils/jwtUtil";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface SignupBody {
  email?: string;
  password?: string;
}

/**
 * Controller to handle **`SignUp`** logic of the application.
 */
@injectable()
@autoInjectable()
export class SignUpController {
  constructor(
    private createUserUseCase?: CreateUserUseCase,
    private insertTokenUseCase?: InsertTokenUseCase
  ) {}

  /**
   * Arrow function (request handler) to handle sign up request.
   *
   * Handles route *`api/users/signup`*
   * @param req Express HTTP Request object to handle incoming request.
   * @param res Express HTTP Response object to handle response of request.
   * @param next NextFunction to call middleware.
   * @throws createHttpError if insufficient or wrong credentials are supplied.
   */
  // eslint-disable-next-line prettier/prettier
  signupHandler: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw createHttpError(400, "Insufficient credentials.");
      }

      assertIsDefined(this.createUserUseCase);
      assertIsDefined(this.insertTokenUseCase);

      const passwordHashed = jwtUtil.genPassword(password);

      const userType: UserType = {
        email: email,
        password: passwordHashed,
        fromGoogle: false,
      };

      const userCreated = await this.createUserUseCase.execute(userType);

      if (userCreated) {
        const jwt = jwtUtil.issueJWT(email);

        await this.insertTokenUseCase.execute(email, jwt.token);

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
