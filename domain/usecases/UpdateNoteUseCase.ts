import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { NoteType } from "../../data/database/NotesModel";
import { AlterNoteMessage } from "../database/IDao";

/**
 * Use Case class to update a note.
 * */
@injectable()
@singleton()
export class UpdateNoteUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async execute(
    userId: string,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage> {
    return await this.repo.updateNote(userId, noteIdMobile, newNote);
  }
}
