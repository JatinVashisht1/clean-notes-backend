import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { INoteRepository } from "../repository/notes/INoteRepository";
import { NoteType } from "../../data/database/notes/NotesModel";
import { AlterNoteMessage } from "../database/notes/INoteDao";

/**
 * Use Case class to update a note.
 * */
@injectable()
@singleton()
export class UpdateNoteUseCase {
  constructor(
    @inject(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY) private repo: INoteRepository
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
