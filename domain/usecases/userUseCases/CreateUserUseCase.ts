import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { UserType } from "../../../data/database/users/UsersModel";
import { IUserRepository } from "../../repository/users/IUserRepository";

/**
 * Use Case class to create a new user.
 * */
@injectable()
@singleton()
export class CreateUserUseCase {
  constructor(
    @inject(CONSTANTS.USER_REPOSITORY_DEPENDENCY) private repo: IUserRepository
  ) {}

  /**
   * Method to insert a new user.
   * @param user {UserType} user of type `UserType` to insert.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async execute(user: UserType): Promise<boolean> {
    return await this.repo.createUser(user);
  }
}
