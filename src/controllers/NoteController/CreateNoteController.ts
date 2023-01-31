import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { isValidObjectId } from "mongoose";
import { autoInjectable } from "tsyringe";
import { NoteType } from "../../../data/database/notes/NotesModel";
import { CreateNoteUseCase } from "../../../domain/usecases/noteUseCases/CreateNoteUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface createNoteBody {
  noteIdMobile?: string;
  title?: string;
  body?: string;
  tags?: [string];
  categories?: [string];
}

/**
 * Controller to handle **`Create Note`** logic of the application.
 */
@autoInjectable()
export class CreateNoteController {
  constructor(
    private createNoteUseCase?: CreateNoteUseCase,
    private getUserIdUseCase?: GetUserIdUseCase
  ) {}

  /**
   * Request Handler to handle *`api/notes/create`* request.
   *
   * Returns all notes associated with user.
   * @param req Express HTTP request object.
   * @param res Express HTTP response object.
   * @param next Express next middleware function.
   * @throws createHttpError if required credentials are not provided is not provided.
   */
  createNoteHandler: RequestHandler<unknown, unknown, createNoteBody, unknown> =
    async (req, res, next) => {
      try {
        const { body, categories, noteIdMobile, tags, title } = req.body;
        const { jwt } = req;

        if (!noteIdMobile || !jwt || !jwt.sub || !title) {
          throw createHttpError(400, "Insufficient credentials.");
        }

        assertIsDefined(this.createNoteUseCase);

        assertIsDefined(this.getUserIdUseCase);

        const userId = await this.getUserIdUseCase.execute(jwt.sub.toString());

        if (!isValidObjectId(userId)) {
          throw createHttpError(400, "User ID is not valid.");
        }

        const savedBy = new mongoose.Types.ObjectId(userId);

        const note: NoteType = {
          title,
          noteIdMobile,
          body,
          tags,
          categories,
          savedBy,
        };

        console.log(`note is ${JSON.stringify(note)}`);

        const noteCreated = await this.createNoteUseCase.execute(userId, note);

        if (noteCreated) {
          return res
            .status(201)
            .json({ success: true, message: "Note created successfully." });
        } else {
          throw createHttpError(500, "Unable to create note.");
        }
      } catch (error) {
        next(error);
      }
    };
}
