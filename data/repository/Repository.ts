import { IRepository } from "../../domain/repository/IRepository";
import { NoteType } from "../database/NotesModel";
import { inject, injectable } from "tsyringe";
import { CONSTANTS } from "../../core/constants";
import {
  AlterNoteMessage,
  IDao,
  ObjectIdMongoose,
} from "../../domain/database/IDao";
import createHttpError from "http-errors";

@injectable()
export class Repository implements IRepository {
  constructor(@inject(CONSTANTS.DAO_DEPENDENCY) private dao: IDao) {}

  /**
   * @param userId MongoDB object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * */
  async createNote(userId: ObjectIdMongoose, note: NoteType): Promise<boolean> {
    const result = await this.dao.createNote(userId, note);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * */
  async deleteNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<AlterNoteMessage> {
    const result = await this.dao.deleteNote(userId, noteIdMobile);

    return result;
  }

  /**
   * @param userId MongoDB object ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * */
  async getNoteById(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<NoteType> {
    const result = await this.dao.getNoteById(userId, noteIdMobile);

    return result;
  }

  /**
   * @param userId MongoDB object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  async getNotes(userId: ObjectIdMongoose): Promise<NoteType[]> {
    const result = await this.dao.getNotes(userId);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async updateNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage> {
    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newBody Updated body that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteBody(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newBody: string
  ): Promise<AlterNoteMessage> {
    const newNote: NoteType = await this.dao.getNoteById(userId, noteIdMobile);

    if (!newNote) {
      throw createHttpError(404, "Note not found");
    }

    newNote.body = newBody;

    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newCategories Updated categories that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteCategories(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newCategories: [string]
  ): Promise<AlterNoteMessage> {
    const newNote: NoteType = await this.dao.getNoteById(userId, noteIdMobile);

    if (!newNote) {
      throw createHttpError(404, "Note not found.");
    }

    newNote.categories = newCategories;

    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTags Updated tags that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteTags(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTags: [string]
  ): Promise<AlterNoteMessage> {
    const newNote: NoteType = await this.dao.getNoteById(userId, noteIdMobile);

    if (!newNote) {
      throw createHttpError(404, "Note not found.");
    }

    newNote.tags = newTags;

    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTitle Updated title that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found or title is empty.
   * */
  async updateNoteTitle(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTitle: string
  ): Promise<AlterNoteMessage> {
    const newNote: NoteType = await this.dao.getNoteById(userId, noteIdMobile);

    if (!newNote) {
      throw createHttpError(404, "Note not found.");
    }

    if (newTitle.trim().length == 0) {
      throw createHttpError(400, "Note title could not be blank.");
    }

    newNote.title = newTitle;

    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }
}
