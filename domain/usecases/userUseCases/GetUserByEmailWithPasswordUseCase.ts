import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { UserType } from "../../../data/database/users/UsersModel";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to get user by email with password.
 */
@injectable()
@singleton()
export class GetUserByEmailWithPasswordUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to get User of `UserType` by email with password.
   * @param email {string} email of user.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  async execute(email: string): Promise<UserType> {
    return await this.repo.getUserByEmailWithPassword(email);
  }
}
