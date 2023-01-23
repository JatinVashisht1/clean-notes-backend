import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { INoteRepository } from "../../repository/notes/INoteRepository";
import { NoteType } from "../../../data/database/notes/NotesModel";

/**
 * Use Case class to get a note by note ID.
 * */
@injectable()
@singleton()
export class GetNoteByIDUseCase {
  constructor(
    @inject(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY) private repo: INoteRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * */
  async execute(userId: string, noteIdMobile: string): Promise<NoteType> {
    return await this.repo.getNoteById(userId, noteIdMobile);
  }
}
