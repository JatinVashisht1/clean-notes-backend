import mongoose from "mongoose";
import createHttpError from "http-errors";

type objectId = string | mongoose.Types.ObjectId;
export function isValidObjectId(userId: objectId): boolean {
  if (mongoose.isValidObjectId(userId)) {
    return true;
  } else {
    throw createHttpError(400, "Invalid user ID.");
  }
}
