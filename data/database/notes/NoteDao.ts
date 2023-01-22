import createHttpError from "http-errors";
import {
  AlterNoteMessage,
  INoteDao,
} from "../../../domain/database/notes/INoteDao";
import { NoteType, NoteModel } from "./NotesModel";
import { singleton } from "tsyringe";
import mongoose from "mongoose";
import { isValidObjectId } from "../../../core/mongooseUtils";

/**
 * @implements {IDao}
 * */
@singleton()
export class NoteDao implements INoteDao {
  /** @private */
  NoteModel: typeof NoteModel;

  constructor() {
    this.NoteModel = NoteModel;
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
    // TODO: 'change this to find user from UserModel later'
    const user = await this.NoteModel.findOne({ savedBy: userId }).exec();

    if (!user) {
      return false;
    }
    return true;
  }
}
