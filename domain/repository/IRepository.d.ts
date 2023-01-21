import { AlterNoteMessage } from "../IDao";
import { NoteType } from "../../data/database/notesModel";

/**
 * Type definition for creating a Repository object.
 * */
export type IRepository = {
  /**
   * @param userId Database object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * */
  createNote(userId: string, note: NoteType): Promise<boolean>;

  /**
   * @param userId Database object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  getNotes(userId: string): Promise<NoteType[]>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * */
  getNoteById(userId: string, noteIdMobile: string): Promise<NoteType>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNote(
    userId: string,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTitle Updated title that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteTitle(
    userId: string,
    noteIdMobile: string,
    newTitle: string
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newBody Updated body that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteBody(
    userId: string,
    noteIdMobile: string,
    newBody: string
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newCategories Updated categories that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteCategories(
    userId: string,
    noteIdMobile: string,
    newCategories: [string]
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTags Updated tags that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteTags(
    userId: string,
    noteIdMobile: string,
    newTags: [string]
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId Database ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * */
  deleteNote(userId: string, noteIdMobile: string): Promise<AlterNoteMessage>;
};
