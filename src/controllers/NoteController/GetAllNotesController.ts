import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable, injectable } from "tsyringe";
import { GetNotesUseCase } from "../../../domain/usecases/noteUseCases/GetNotesUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";

@injectable()
@autoInjectable()
export class GetAllNotesController {
  constructor(
    private getNotesUseCase?: GetNotesUseCase,
    private getUserIdUseCase?: GetUserIdUseCase
  ) {}

  getAllNotesHandler: RequestHandler = async (req, res, next) => {
    try {
      let email = req.jwt.sub;

      if (!email) {
        throw createHttpError(400, "Email not found.");
      }

      email = email.toString();

      assertIsDefined(this.getNotesUseCase);
      assertIsDefined(this.getUserIdUseCase);

      const userId = await this.getUserIdUseCase.execute(email);

      const notes = await this.getNotesUseCase.execute(userId);

      return res
        .status(200)
        .json({ success: true, message: JSON.stringify(notes) });
    } catch (error) {
      next(error);
    }
  };
}
