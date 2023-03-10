import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable, injectable } from "tsyringe";
import { GetUserByEmailWithPasswordUseCase } from "../../../domain/usecases/userUseCases/GetUserByEmailWithPasswordUseCase";
import { InsertTokenUseCase } from "../../../domain/usecases/userUseCases/InsertTokenUseCase";
import { UserExistUseCase } from "../../../domain/usecases/userUseCases/UserExistUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";
import { issueJWT, passwordType, validPassword } from "../../utils/jwtUtil";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface signInBody {
  email?: string;
  password?: string;
}

/**
 * Controller to handle **`SignIn`** logic of the application.
 */
@injectable()
@autoInjectable()
export class SignInController {
  constructor(
    private userExistUseCase?: UserExistUseCase,
    private getUserByEmailWithPasswordUseCase?: GetUserByEmailWithPasswordUseCase,
    private insertTokenUseCase?: InsertTokenUseCase
  ) {}

  /**
   * Arrow function (request handler) to handle sign in request.
   *
   * Handles route *`api/users/signin`*
   * @param req Express HTTP Request object to handle incoming request.
   * @param res Express HTTP Response object to handle response of request.
   * @param next NextFunction to call middleware.
   * @throws createHttpError if insufficient or wrong credentials are supplied.
   */
  // eslint-disable-next-line prettier/prettier
  signInHandler: RequestHandler<unknown, unknown, signInBody, unknown> = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw createHttpError(400, "Insufficient credentials.");
      }

      assertIsDefined(this.userExistUseCase);
      assertIsDefined(this.getUserByEmailWithPasswordUseCase);
      assertIsDefined(this.insertTokenUseCase);

      const userExist = await this.userExistUseCase.execute(email);

      if (!userExist) {
        throw createHttpError(404, "User does not exist.");
      }

      const user = await this.getUserByEmailWithPasswordUseCase.execute(email);

      // console.log(`user is ${JSON.stringify(user.password)}`);

      if (
        user.fromGoogle ||
        !user.password ||
        !user.password.hash ||
        !user.password.salt
      ) {
        throw createHttpError(400, "Account created with Google.");
      }

      const passwordType: passwordType = {
        hash: user.password.hash,
        salt: user.password.salt,
      };
      const passwordValid = validPassword(password, passwordType);

      if (!passwordValid) {
        throw createHttpError(400, "Invalid email/password");
      }

      const jwt = issueJWT(email);

      const tokenInserted = await this.insertTokenUseCase.execute(
        email,
        jwt.token
      );

      if (tokenInserted) {
        return res.status(200).json({ success: true, message: jwt });
      } else {
        throw createHttpError(500, "Unable to sign in user.");
      }
    } catch (error) {
      next(error);
    }
  };
}
