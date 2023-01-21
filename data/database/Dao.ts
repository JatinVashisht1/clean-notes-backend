import createHttpError from "http-errors";
import { Schema } from "mongoose";
import {
  AlterNoteMessage,
  IDao,
  ObjectIdMongoose,
} from "../../domain/database/IDao";
import { NoteType, NoteModel } from "./NotesModel";

/**
 * @implements {IDao}
 * */
export class Dao implements IDao {
  /** @private */
  NoteModel: typeof NoteModel;

  constructor() {
    this.NoteModel = NoteModel;
  }

  /**
   * @param userId MongoDB object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * */
  async createNote(
    userId: Schema.Types.ObjectId,
    note: NoteType
  ): Promise<boolean> {
    const userExist = await this.userExist(userId);

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
   * @param userId MongoDB object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  async getNotes(userId: Schema.Types.ObjectId): Promise<NoteType[]> {
    const userExist = await this.userExist(userId);

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
   * @param userId MongoDB object ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * */
  async getNoteById(
    userId: Schema.Types.ObjectId,
    noteIdMobile: string
  ): Promise<NoteType> {
    const userExist = await this.userExist(userId);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const note = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile: noteIdMobile,
    }).exec();

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
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} createHttpError is thrown if user is not found in the database.
   * @override
   * */
  async updateNote(
    userId: Schema.Types.ObjectId,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage> {
    const userExist = await this.userExist(userId);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const note = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile: noteIdMobile,
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
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * @throws {createHttpError} createHttpError is thrown if either note or user is not found in the database.
   * @override
   * */
  async deleteNote(
    userId: Schema.Types.ObjectId,
    noteIdMobile: string
  ): Promise<AlterNoteMessage> {
    const userExist = await this.userExist(userId);

    if (!userExist) {
      throw createHttpError(404, "User not found.");
    }

    const noteDb = await this.NoteModel.findOne({
      savedBy: userId,
      noteIdMobile: noteIdMobile,
    }).exec();

    if (!noteDb) {
      throw createHttpError(404, "Note not found");
    }

    const deleteResponse = await this.NoteModel.deleteOne({
      savedBy: userId,
      noteIdMobile: noteIdMobile,
    }).exec();

    return {
      acknowledged: deleteResponse.acknowledged,
      rowsAffected: deleteResponse.deletedCount,
    };
  }

  /**
   * @param userId MongoDB ID of the user.
   * @returns {boolean} true if user exist in database false if user does not exist in database.
   * */
  async userExist(userId: ObjectIdMongoose): Promise<boolean> {
    // TODO: 'change this to find user from UserModel later'
    const user = await this.NoteModel.find({ savedBy: userId }).exec();

    if (!user) {
      return false;
    }
    return true;
  }
}
