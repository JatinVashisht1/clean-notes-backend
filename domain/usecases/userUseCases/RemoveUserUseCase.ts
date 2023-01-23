import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to remove user.
 */
@injectable()
@singleton()
export class RemoveUserUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to remove user from database.
   * @param email {string} email of user.
   * @returns {boolean} true if operation succeeded, false otherwise.
   */
  async execute(email: string): Promise<boolean> {
    return await this.repo.removeUser(email);
  }
}
