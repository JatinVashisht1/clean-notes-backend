import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to check if a valid token exist or not.
 */
@injectable()
@singleton()
export class TokenExistUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to know if a token exist.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @returns {Promise<boolean>} true if token exist, false otherwise.
   */
  async execute(email: string, token: string): Promise<boolean> {
    return await this.repo.tokenExist(email, token);
  }
}
