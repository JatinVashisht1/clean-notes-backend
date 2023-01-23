import { UserType } from "../../../data/database/users/UsersModel";

/**
 * Type definition for creating a User Repository object.
 */
export type IUserRepository = {
  /**
   * Method to get User of `UserType` by email.
   * @param email {string} email of user.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  getUserByEmailWithPassword(email: string): Promise<UserType>;

  /**
   * Method to get User of `UserType` by email.
   * @param email {string} email of user.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  getUserByEmailWithoutPassword(email: string): Promise<UserType>;

  /**
   * Method to get Database Object ID of user.
   * @param email {string} email of user.
   * @returns {string} Database Object ID.
   */
  getUserId(email: string): Promise<string>;

  /**
   * Method to insert a new token in valid token list of user.
   * @param email {string} email of user.
   * @param token {string} token to insert in the valid token list.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  insertToken(email: string, token: string): Promise<boolean>;

  /**
   * Method to remove a token from valid token list.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  removeToken(email: string, token: string): Promise<boolean>;

  /**
   * Method to know if a token exist.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @returns {Promise<boolean>} true if token exist, false otherwise.
   */
  tokenExist(email: string, token: string): Promise<boolean>;

  /**
   * Method to insert a new user.
   * @param user {UserType} user of type `UserType` to insert.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  createUser(user: UserType): Promise<boolean>;

  /**
   * Method to update password of user.
   * @param email {string} email of user.
   * @param salt {string} new salt to store.
   * @param hash {string} new hash to store.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  updatePassword(email: string, salt: string, hash: string): Promise<boolean>;

  /**
   * Method to remove user from database.
   * @param email {string} email of user.
   * @returns {boolean} true if operation succeeded, false otherwise.
   */
  removeUser(email: string): Promise<boolean>;
};
