import { injectable, singleton, inject } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { AlterNoteMessage } from "../database/notes/INoteDao";
import { INoteRepository } from "../repository/notes/INoteRepository";

/**
 * Use Case class to delete a note.
 * */
@injectable()
@singleton()
export class DeleteNoteUseCase {
  constructor(
    @inject(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY) private repo: INoteRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * */
  async execute(
    userId: string,
    noteIdMobile: string
  ): Promise<AlterNoteMessage> {
    return await this.repo.deleteNote(userId, noteIdMobile);
  }
}
