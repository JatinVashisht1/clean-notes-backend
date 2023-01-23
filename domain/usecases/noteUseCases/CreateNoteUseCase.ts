import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { INoteRepository } from "../../repository/notes/INoteRepository";
import { NoteType } from "../../../data/database/notes/NotesModel";

/**
 * Use Case class to create new note.
 * */
@injectable()
@singleton()
export class CreateNoteUseCase {
  constructor(
    @inject(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY) private repo: INoteRepository
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
