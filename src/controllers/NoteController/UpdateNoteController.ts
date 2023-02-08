import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { autoInjectable } from "tsyringe";
import { NoteType } from "../../../data/database/notes/NotesModel";
import { UpdateNoteUseCase } from "../../../domain/usecases/noteUseCases/UpdateNoteUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface UpdateNoteBody {
  title?: string;
  noteBody?: string;
  tags?: [string];
  categories?: [string];
  noteIdMobile?: string;
  savedBy?: string;
}

/**
 * Controller to handle **`Update Note`** logic of the application.
 */
@autoInjectable()
export class UpdateNoteController {
  constructor(
    private updateNoteUseCase?: UpdateNoteUseCase,
    private getUserIdUseCase?: GetUserIdUseCase
  ) {}

  /**
   * Request Handler to handle *`api/notes/update`* request.
   *
   * Update note by title specified by user.
   * @param req Express HTTP request object.
   * @param res Express HTTP response object.
   * @param next Express next middleware function.
   * @throws createHttpError if required credentials are not provided is not provided.
   */
  updateNoteHandler: RequestHandler<unknown, unknown, UpdateNoteBody, unknown> =
    async (req, res, next) => {
      const { categories, noteBody, noteIdMobile, savedBy, tags, title } =
        req.body;

      const { jwt } = req;

      try {
        if (!title || !noteIdMobile || !savedBy || !jwt) {
          throw createHttpError(400, "Insufficient credentials");
        }

        assertIsDefined(this.updateNoteUseCase);

        assertIsDefined(this.getUserIdUseCase);

        assertIsDefined(jwt.sub);

        const email = jwt.sub.toString();

        const isSavedByObjectId = mongoose.isValidObjectId(savedBy);

        if (!isSavedByObjectId) {
          throw createHttpError(400, "Invalid user id.");
        }

        const savedByObjectId = new mongoose.Types.ObjectId(savedBy);

        const userId = await this.getUserIdUseCase.execute(email);

        const newNote: NoteType = {
          noteIdMobile,
          savedBy: savedByObjectId,
          tags,
          title,
          body: noteBody,
          categories,
        };

        const updateNoteResult = await this.updateNoteUseCase.execute(
          userId,
          noteIdMobile,
          newNote
        );

        if (!updateNoteResult.acknowledged) {
          throw createHttpError(400, "Note not updated.");
        } else {
          return res
            .status(200)
            .json({ success: true, message: "Note updated successfully." });
        }
      } catch (error) {
        next(error);
      }
    };
}
