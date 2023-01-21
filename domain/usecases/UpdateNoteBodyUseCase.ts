import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import { IRepository } from "../repository/IRepository";
import { AlterNoteMessage } from "../database/IDao";

/**
 * Use Case class to update body of a note.
 * */
@injectable()
@singleton()
export class UpdateNoteBodyUseCase {
  constructor(
    @inject(CONSTANTS.REPOSITORY_DEPENDENCY) private repo: IRepository
  ) {}

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newBody Updated body that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async execute(
    userId: string,
    noteIdMobile: string,
    newBody: string
  ): Promise<AlterNoteMessage> {
    return await this.repo.updateNoteBody(
      userId,
      noteIdMobile,
      newBody
    );
  }
}
