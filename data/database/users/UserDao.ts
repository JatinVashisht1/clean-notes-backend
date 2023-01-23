/* eslint-disable object-shorthand */
import createHttpError from "http-errors";
import { singleton } from "tsyringe";
import { IUserDao } from "../../../domain/database/users/IUserDao";
import { UserType } from "./UsersModel";
import { UserModel } from "./UsersModel";

@singleton()
export class UserDao implements IUserDao {
  /**
   * instance of `UserModel` to perform CRUD operations.
   * @private
   */
  userModel: typeof UserModel;
  constructor() {
    this.userModel = UserModel;
  }

  /**
   * Method to get User of `UserType` by email with password.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  async getUserByEmailWithPassword(email: string): Promise<UserType> {
    const userDoc = await this.userModel
      .findOne({ email }, "email password fromGoogle")
      .exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found.");
    }

    const userType: UserType = {
      email,
      password: userDoc.password,
      fromGoogle: userDoc.fromGoogle,
    };

    return userType;
  }

  /**
   * Method to get User of `UserType` by email without password.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<UserType>} Promise of `UserType`.
   */
  async getUserByEmailWithoutPassword(email: string): Promise<UserType> {
    const userDoc = await this.userModel
      .findOne({ email }, "email fromGoogle")
      .exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found.");
    }

    const userType: UserType = {
      email,
      fromGoogle: userDoc.fromGoogle,
    };

    return userType;
  }

  /**
   * Method to get Database Object ID of user.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {string} Database Object ID.
   */
  async getUserId(email: string): Promise<string> {
    const userDoc = await this.userModel
      .findOne({ email: email }, "_id")
      .exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found.");
    }

    return userDoc._id.toString();
  }

  /**
   * Method to insert a new token in valid token list of user.
   * @param email {string} email of user.
   * @param token {string} token to insert in the valid token list.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async insertToken(email: string, token: string): Promise<boolean> {
    const userDoc = await this.userModel
      .findOne({ email: email }, "email password fromGoogle tokens")
      .exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found");
    }
    const userType: UserType = {
      email: userDoc.email,
      password: userDoc.password,
      fromGoogle: userDoc.fromGoogle,
      tokens: userDoc.tokens,
    };

    if (!userType.tokens) {
      userType.tokens = [token];
    } else {
      userType.tokens.push(token);
    }

    const updateResult = await this.userModel
      .findOne({ email: email })
      .update(userType)
      .exec();

    if (updateResult.acknowledged) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Method to remove a token from valid token list.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @throws {createHttpError} is thrown if user is not found or no valid token is present.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async removeToken(email: string, token: string): Promise<boolean> {
    const userDoc = await this.userModel.findOne({ email: email }).exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found.");
    }

    if (!userDoc.tokens) {
      throw createHttpError(400, "No token exist.");
    }

    const updateResult = await this.userModel
      .updateOne({ email: email }, { $pull: { tokens: token } })
      .exec();

    return updateResult.acknowledged;
  }

  /**
   * Method to know if a token exist.
   * @param email {string} email of user.
   * @param token {string} token that is to be removed from the valid token list of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {Promise<boolean>} true if token exist, false otherwise.
   */
  async tokenExist(email: string, token: string): Promise<boolean> {
    const userDoc = await this.userModel
      .findOne({ email: email, tokens: token })
      .exec();

    if (!userDoc) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Method to create a new user.
   * @param user {UserType} user of type `UserType` to insert.
   * @returns {Promise<boolean>} true if operation succeeded, false otherwise.
   */
  async createUser(user: UserType): Promise<boolean> {
    const newUser = await this.userModel.create(user);

    if (newUser.isNew) {
      return true;
    } else {
      return false;
    }
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
    const userDoc = await this.userModel.find({ email: email }).exec();

    if (!userDoc) {
      throw createHttpError(404, "User not found.");
    }

    const updateResult = await this.userModel
      .updateOne({ email: email }, { salt: salt, hash: hash })
      .exec();

    return updateResult.acknowledged;
  }

  /**
   * Method to remove user from database.
   * @param email {string} email of user.
   * @throws {createHttpError} is thrown if user is not found.
   * @returns {boolean} true if operation succeeded, false otherwise.
   */
  async removeUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    const updateResult = await this.userModel
      .deleteOne({ email: email })
      .exec();

    return updateResult.acknowledged && updateResult.deletedCount > 0;
  }
}
