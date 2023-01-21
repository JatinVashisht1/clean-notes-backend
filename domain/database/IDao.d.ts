import { Schema } from "mongoose";
import { NoteType } from "../data/database/NotesModel";

export type ObjectIdMongoose = Schema.Types.ObjectId;

export type AlterNoteMessage = {
  acknowledged: boolean;
  rowsAffected: number;
};

export type IDao = {
  /**
   * @param userId MongoDB object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * */
  createNote(userId: ObjectIdMongoose, note: NoteType): Promise<boolean>;

  /**
   * @param userId MongoDB object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID will be returned.
   * */
  getNotes(userId: ObjectIdMongoose): Promise<NoteType[]>;

  /**
   * @param userId MongoDB object ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<NoteType>} Note associated with user ID will be returned.
   * */
  getNoteById(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<NoteType>;

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newNote Updated note that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @returns {Promise<AlterNoteMessage>} Update message of the type AlterNoteMessage.
   * */
  deleteNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<AlterNoteMessage>;
};
