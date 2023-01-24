import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to update user password.
 */
@injectable()
@singleton()
export class UserExistUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to check if user exist or not.
   * @param email {string} email of user.
   * @returns {Promise<boolean>} true if user exist, false otherwise.
   */
  async execute(email: string): Promise<boolean> {
    return await this.repo.userExist(email);
  }
}
