import createHttpError from "http-errors";
import {
  AlterNoteMessage,
  INoteDao,
} from "../../../domain/database/notes/INoteDao";
import { NoteType, NoteModel } from "./NotesModel";
import { singleton } from "tsyringe";
import mongoose from "mongoose";
import { isValidObjectId } from "../../../core/mongooseUtils";
import { UserModel } from "../users/UsersModel";

/**
 * @implements {IDao}
 * */
@singleton()
export class NoteDao implements INoteDao {
  /** @private */
  NoteModel: typeof NoteModel;
  userModel: typeof UserModel;
  constructor() {
    this.NoteModel = NoteModel;
    this.userModel = UserModel;
  }

  /**
   * @param userId Database object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * */
  async createNote(userId: string, note: NoteType): Promise<boolean> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const response = await this.NoteModel.create(note);

    if (!response) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @param userId Database object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  async getNotes(userId: string): Promise<NoteType[]> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const notesDb = await this.NoteModel.find({ savedBy: userId }).exec();
    const notes: NoteType[] = new Array<NoteType>(0);

    notesDb.forEach(function (noteDb) {
      const note: NoteType = {
        savedBy: noteDb.savedBy,
        title: noteDb.title,
        body: noteDb.body,
        categories: noteDb.categories,
        noteIdMobile: noteDb.noteIdMobile,
        tags: noteDb.tags,
      };

      notes.push(note);
    });
    if (!notes) {
      return [];
    }
    return notes;
  }

  /**
   * @param userId Database object ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * */
  async getNoteById(userId: string, noteIdMobile: string): Promise<NoteType> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const note = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile,
    }).exec();

    console.log(`note returned is ${note}`);

    if (!note) {
      throw createHttpError(404, "Note not found.");
    }

    const noteType: NoteType = {
      savedBy: note.savedBy,
      title: note.title,
      body: note.body,
      tags: note.tags,
      categories: note.categories,
      noteIdMobile: note.noteIdMobile,
    };

    return noteType;
  }

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * @override
   * */
  async updateNote(
    userId: string,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const note = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile,
    })
      .update(newNote)
      .exec();

    if (note.acknowledged && note.matchedCount > 0 && note.modifiedCount > 0) {
      return {
        acknowledged: true,
        rowsAffected: note.modifiedCount,
      };
    } else if (
      note.acknowledged &&
      (note.matchedCount == 0 || note.modifiedCount == 0)
    ) {
      return {
        acknowledged: true,
        rowsAffected: 0,
      };
    } else {
      return {
        acknowledged: false,
        rowsAffected: 0,
      };
    }
  }

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * @throws {createHttpError} createHttpError is thrown if either note or user is not found in the database.
   * @override
   * */
  async deleteNote(
    userId: string,
    noteIdMobile: string
  ): Promise<AlterNoteMessage> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const noteDb = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile,
    }).exec();

    if (!noteDb) {
      throw createHttpError(404, "Note not found");
    }

    const deleteResponse = await this.NoteModel.deleteOne({
      savedBy: userId,
      noteIdMobile,
    }).exec();

    return {
      acknowledged: deleteResponse.acknowledged,
      rowsAffected: deleteResponse.deletedCount,
    };
  }

  /**
   * @experimental
   * @param userId Database ID of the user.
   * @returns {boolean} true if user exist in database false if user does not exist in database.
   * */
  async userExist(userId: mongoose.Types.ObjectId): Promise<boolean> {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Method to delete all notes associated with `userId`
   * @param userId Database ID of the user.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * @throws createHttpError if user is not found.
   * */
  async deleteAllNotes(userId: string): Promise<AlterNoteMessage> {
    isValidObjectId(userId);

    const userIdMongoose = new mongoose.Types.ObjectId(userId);

    const userExist = await this.userExist(userIdMongoose);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const result = await this.NoteModel.deleteMany({ savedBy: userId });

    const alterNoteMessage: AlterNoteMessage = {
      acknowledged: true,
      rowsAffected: result.deletedCount,
    };

    return alterNoteMessage;
  }
}
