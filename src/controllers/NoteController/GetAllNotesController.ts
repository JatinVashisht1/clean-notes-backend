import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import {
  getGetNotesUseCase,
  getGetUserIdUseCase,
} from "../../../di/registerDependencies";
import { GetNotesUseCase } from "../../../domain/usecases/noteUseCases/GetNotesUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";

@injectable()
export class GetAllNotesController {
  private getNotesUseCase: GetNotesUseCase;
  private getUserIdUseCase: GetUserIdUseCase;
  constructor() {
    this.getUserIdUseCase = getGetUserIdUseCase();
    this.getNotesUseCase = getGetNotesUseCase();
  }

  getAllNotesHandler: RequestHandler = async (req, res, next) => {
    try {
      let email = req.jwt.sub;

      if (!email) {
        throw createHttpError(400, "Email not found.");
      }

      email = email.toString();

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
