import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { autoInjectable } from "tsyringe";
import { GetNoteByIDUseCase } from "../../../domain/usecases/noteUseCases/GetNoteByIDUseCase";
import { GetUserIdUseCase } from "../../../domain/usecases/userUseCases/GetUserIdUseCase";
import { assertIsDefined } from "../../utils/assertIsDefined";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface GetNoteByIdBody {
  noteIdMobile: string;
}

/**
 * Controller to handle **`Get Note by ID`** logic of the application.
 */
@autoInjectable()
export class GetNoteByIdController {
  constructor(
    private getNoteByIdUseCase?: GetNoteByIDUseCase,
    private getUserIdUseCase?: GetUserIdUseCase
  ) {}

  /**
   * Request Handler to handle *`api/notes/get`* request.
   *
   * Get note by mobile database id of note.
   * @param req Express HTTP request object.
   * @param res Express HTTP response object.
   * @param next Express next middleware function.
   * @throws createHttpError if required credentials are not provided is not provided.
   */
  getNoteByIdHandler: RequestHandler<
    unknown,
    unknown,
    GetNoteByIdBody,
    unknown
  > = async (req, res, next) => {
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

      assertIsDefined(this.getNoteByIdUseCase);

      assertIsDefined(this.getUserIdUseCase);

      const email = jwt.sub.toString();

      const userId = await this.getUserIdUseCase.execute(email);

      const noteDb = await this.getNoteByIdUseCase.execute(
        userId,
        noteIdMobile
      );

      return res.status(200).json({ success: true, message: noteDb });
    } catch (error) {
      next(error);
    }
  };
}
