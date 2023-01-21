import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { AlterNoteMessage } from "../database/IDao";

/**
 * Use Case class to update categories of note.
 * */
@injectable()
@singleton()
export class UpdateNoteCategoriesUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newCategories Updated categories that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async execute(
    userId: string,
    noteIdMobile: string,
    newCategories: [string]
  ): Promise<AlterNoteMessage> {
    return await this.repo.updateNoteCategories(
      userId,
      noteIdMobile,
      newCategories
    );
  }
}
