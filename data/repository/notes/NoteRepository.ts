import { INoteRepository } from "../../../domain/repository/notes/INoteRepository";
import { NoteType } from "../../../data/database/notes/NotesModel";
import { inject, injectable, singleton } from "tsyringe";
import { CONSTANTS } from "../../../core/constants";
import {
  AlterNoteMessage,
  INoteDao,
} from "../../../domain/database/notes/INoteDao";
import createHttpError from "http-errors";

/**
 * Repository to perform `CRUD` operations on notes.
 * @implements {IRepository}
 * @requires {IDao}
 * */
@injectable()
@singleton()
export class NoteRepository implements INoteRepository {
  constructor(@inject(CONSTANTS.NOTE_DAO_DEPENDENCY) private dao: INoteDao) {}

  /**
   * @param userId Database object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * */
  async createNote(userId: string, note: NoteType): Promise<boolean> {
    const result = await this.dao.createNote(userId, note);

    return result;
  }

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * */
  async deleteNote(
    userId: string,
    noteIdMobile: string
  ): Promise<AlterNoteMessage> {
    const result = await this.dao.deleteNote(userId, noteIdMobile);

    return result;
  }

  /**
   * @param userId Database object ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * */
  async getNoteById(userId: string, noteIdMobile: string): Promise<NoteType> {
    console.log(`request coming at getNoteById repo`);
    const result = await this.dao.getNoteById(userId, noteIdMobile);

    return result;
  }

  /**
   * @param userId Database object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  async getNotes(userId: string): Promise<NoteType[]> {
    const result = await this.dao.getNotes(userId);

    return result;
  }

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  async updateNote(
    userId: string,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage> {
    const result = await this.dao.updateNote(userId, noteIdMobile, newNote);

    return result;
  }

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newBody Updated body that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteBody(
    userId: string,
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
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newCategories Updated categories that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteCategories(
    userId: string,
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
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTags Updated tags that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found.
   * */
  async updateNoteTags(
    userId: string,
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
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTitle Updated title that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * @throws {createHttpError} is thrown if note is not found or title is empty.
   * */
  async updateNoteTitle(
    userId: string,
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
