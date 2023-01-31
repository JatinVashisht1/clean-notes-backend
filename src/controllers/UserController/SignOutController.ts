import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable } from "tsyringe";
import { RemoveTokenUseCase } from "../../../domain/usecases/userUseCases/RemoveTokenUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";

/**
 * Controller to handle **`SignOut`** logic of the application.
 */
@autoInjectable()
export class SignOutController {
  constructor(private removeTokenUseCase?: RemoveTokenUseCase) {}

  /**
   * Arrow function (request handler) to handle sign out request.
   *
   * Handles route *`api/users/signout`*
   * @param req Express HTTP request object.
   * @param res Express HTTP response object.
   * @param next Next middleware function.
   * @throws `createHttpError` if user is unable to sign out or required credentials are not valid/provided.
   */
  signOutHandler: RequestHandler = async (req, res, next) => {
    try {
      const { jwt, token } = req;

      assertIsDefined(jwt);

      let email = jwt.sub;

      assertIsDefined(email);

      assertIsDefined(this.removeTokenUseCase);

      assertIsDefined(token);

      email = email.toString();

      const result = await this.removeTokenUseCase.execute(email, token);

      if (result) {
        return res
          .status(202)
          .json({ success: true, message: "User signed out successfully." });
      } else {
        throw createHttpError(500, "Unable to sign out user");
      }
    } catch (error) {
      next(error);
    }
  };
}
