import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to insert a valid token.
 */
@injectable()
@singleton()
export class InsertTokenUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to insert a new token in valid token list of user.
   * @param email {string} email of user.
   * @param token {string} token to insert in the valid token list.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async execute(email: string, token: string): Promise<boolean> {
    return await this.repo.insertToken(email, token);
  }
}
