import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { AlterNoteMessage } from "../database/IDao";

/**
 * Use Case class to update title of a note.
 * */
@injectable()
@singleton()
export class UpdateNoteTitleUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTitle Updated title that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async execute(
    userId: string,
    noteIdMobile: string,
    newTitle: string
  ): Promise<AlterNoteMessage> {
    return await this.repo.updateNoteTitle(userId, noteIdMobile, newTitle);
  }
}
