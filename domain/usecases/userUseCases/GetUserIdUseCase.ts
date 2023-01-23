import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to get database user id.
 */
@injectable()
@singleton()
export class GetUserIdUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to get Database Object ID of user.
   * @param email {string} email of user.
   * @returns {Promise<string>} Database Object ID.
   */
  async execute(email: string): Promise<string> {
    return await this.repo.getUserId(email);
  }
}
