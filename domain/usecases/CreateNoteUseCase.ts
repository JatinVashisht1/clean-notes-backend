import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { NoteType } from "../../data/database/NotesModel";

/**
 * Use Case class to create new note.
 * */
@injectable()
@singleton()
export class CreateNoteUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {Promise<boolean>} true if note is created false if note is not created.
   * */
  async execute(userId: string, note: NoteType): Promise<boolean> {
    return await this.repo.createNote(userId, note);
  }
}
