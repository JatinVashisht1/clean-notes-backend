import { InferSchemaType, model, Schema } from "mongoose";

/**
 * Type of user password.
 *
 * Password will be stored in the form of salt and hash.
 */
const passwordType = new Schema({
  salt: {
    type: String,
    select: true,
  },
  hash: {
    type: String,
    select: true,
  },
});

/**
 * Schema of User Document to be stored in database.
 */
const userSchema = new Schema({
  /**
   * Email of user.
   *
   * It is required to create an account
   */
  email: {
    type: String,
    required: true,
    unique: true,
  },

  /**
   * Passsword assciated with user account.
   *
   * It is optional only when user is authorized through google.
   */
  password: {
    type: passwordType,
    required: false,
    unique: false,
    select: false,
  },

  /**
   * to store currently active/valid tokens issued to user.
   */
  tokens: {
    type: [String],
    required: false,
    unique: false,
    default: null,
    select: false,
  },

  /**
   * Boolean to keep track of whether user is authorized from google.
   */
  fromGoogle: {
    type: Boolean,
    required: true,
    select: false,
  },
});

/**
 * @type Type definition of user document to work on for database operations.
 */
export type UserType = InferSchemaType<typeof userSchema>;

/**
 * MongoDB model of type `UserType`.
 *
 * It is used to access User databse.
 */
export const UserModel = model<UserType>("User", userSchema);
