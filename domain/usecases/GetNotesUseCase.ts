import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { NoteType } from "../../data/database/NotesModel";

/**
 * Use Case class to get all notes associated with a user.
 * */
@injectable()
@singleton()
export class GetNotesUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  async execute(userId: string): Promise<NoteType[]> {
    return await this.repo.getNotes(userId);
  }
}
