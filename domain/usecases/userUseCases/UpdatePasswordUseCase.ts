import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to update user password.
 */
@injectable()
@singleton()
export class UpdatePasswordUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to update password of user.
   * @param email {string} email of user.
   * @param salt {string} new salt to store.
   * @param hash {string} new hash to store.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async execute(email: string, salt: string, hash: string): Promise<boolean> {
    return await this.repo.updatePassword(email, salt, hash);
  }
}
