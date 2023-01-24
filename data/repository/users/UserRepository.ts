import createHttpError from "http-errors";
import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import { IUserDao } from "../../../domain/database/users/IUserDao";
import { IUserRepository } from "../../../domain/repository/users/IUserRepository";
import { UserType } from "../../database/users/UsersModel";

@singleton()
@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(CONSTANTS.USER_DAO_DEPENDENCY) private userDao: IUserDao
  ) {}

  /**
   * Method to check if user exist or note.
   * @param email {string} email of user.
   * @returns {Promise<boolean>} true if user exist, false otherwise.
   */
  async userExist(email: string): Promise<boolean> {
    const exist = await this.userDao.userExist(email);

    return exist;
  }

  /**
   * Method to get User of `UserType` by email with password.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  async getUserByEmailWithPassword(email: string): Promise<UserType> {
    return await this.userDao.getUserByEmailWithPassword(email);
  }

  /**
   * Method to get User of `UserType` by email without password.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  async getUserByEmailWithoutPassword(email: string): Promise<UserType> {
    return await this.userDao.getUserByEmailWithoutPassword(email);
  }

  /**
   * Method to get Database Object ID of user.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {string} Database Object ID.
   */
  async getUserId(email: string): Promise<string> {
    return await this.userDao.getUserId(email);
  }

  /**
   * Method to insert a new token in valid token list of user.
   * @param email {string} email of user.
   * @param token {string} token to insert in the valid token list.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async insertToken(email: string, token: string): Promise<boolean> {
    return await this.userDao.insertToken(email, token);
  }

  /**
   * Method to remove a token from valid token list.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @throws {createHttpError} is thrown if user is not found or no valid token is present.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async removeToken(email: string, token: string): Promise<boolean> {
    return await this.userDao.removeToken(email, token);
  }

  /**
   * Method to know if a token exist.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<boolean>} true if token exist, false otherwise.
   */
  async tokenExist(email: string, token: string): Promise<boolean> {
    return await this.userDao.tokenExist(email, token);
  }

  /**
   * Method to create a new user.
   * @param user {UserType} user of type `UserType` to insert.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async createUser(user: UserType): Promise<boolean> {
    const userExist = await this.userDao.userExist(user.email);

    if (userExist) {
      throw createHttpError(400, "User already exist.");
    }
    return await this.userDao.createUser(user);
  }

  /**
   * Method to update password of user.
   * @param email {string} email of user.
   * @param salt {string} new salt to store.
   * @param hash {string} new hash to store.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async updatePassword(
    email: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    return await this.userDao.updatePassword(email, salt, hash);
  }

  /**
   * Method to remove user from database.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {boolean} true if operation succeeded, false otherwise.
   */
  async removeUser(email: string): Promise<boolean> {
    return await this.userDao.removeUser(email);
  }
}
