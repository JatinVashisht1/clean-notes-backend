import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { INoteRepository } from "../repository/notes/INoteRepository";
import { NoteType } from "../../data/database/notes/NotesModel";

/**
 * Use Case class to get all notes associated with a user.
 * */
@injectable()
@singleton()
export class GetNotesUseCase {
  constructor(
    @inject(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY) private repo: INoteRepository
  ) {}

  /**
   * @param userId Database object ID of the user.
   * @returns {Promise<NoteType[]>} Array of notes associated with user ID will be returned.
   * */
  async execute(userId: string): Promise<NoteType[]> {
    return await this.repo.getNotes(userId);
  }
}
