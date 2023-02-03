import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable } from "tsyringe";
import { DeleteNoteUseCase } from "../../../domain/usecases/noteUseCases/DeleteNoteUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface DeleteNoteBody {
  noteIdMobile?: string;
}

/**
 * Controller to handle **`Delete Note`** logic of the application.
 */
@autoInjectable()
export class DeleteNoteController {
  constructor(
    private deleteNoteUseCase?: DeleteNoteUseCase,
    private getUserIdUseCase?: GetUserIdUseCase
  ) {}

  /**
   * Request Handler to handle *`api/notes/deleteNote`* request.
   *
   * Delete note by mobile database id of note.
   * @param req Express HTTP request object.
   * @param res Express HTTP response object.
   * @param next Express next middleware function.
   * @throws createHttpError if required credentials are not provided is not provided.
   */
  deleteNoteHandler: RequestHandler<unknown, unknown, DeleteNoteBody, unknown> =
    async (req, res, next) => {
      const { noteIdMobile } = req.body;

      try {
        if (!noteIdMobile) {
          throw createHttpError(404, "Note ID not found.");
        }

        const { jwt } = req;

        if (!jwt) {
          throw createHttpError(404, "JWT not found.");
        }

        if (!jwt.sub) {
          throw createHttpError(404, "User ID is not found.");
        }

        if (!this.deleteNoteUseCase || !this.getUserIdUseCase) {
          throw createHttpError(500, "Something went wrong.");
        }

        const userEmail = jwt.sub.toString();

        const userId = await this.getUserIdUseCase.execute(userEmail);

        console.log(`user id is ${userId}`);

        const result = await this.deleteNoteUseCase.execute(
          userId,
          noteIdMobile
        );

        if (result.acknowledged && result.rowsAffected > 0) {
          return res
            .status(200)
            .json({ success: true, message: "Note deleted successfully." });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "Note not deleted." });
        }
      } catch (error) {
        next(error);
      }
    };
}
