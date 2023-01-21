import { AlterNoteMessage, ObjectIdMongoose } from "../IDao";
import { NoteType } from "../../data/database/notesModel";

export type IRepository = {
  /**
   * @param userId MongoDB object ID of the user.
   * @param note Note of type NoteType that user wants to save.
   * @returns {boolean} true if note is created false if note is not created.
   * */
  createNote(userId: ObjectIdMongoose, note: NoteType): Promise<boolean>;

  /**
   * @param userId MongoDB object ID of the user.
   * @returns {Promise<[NoteType]>}: Array of notes associated with user ID and note ID will be returned.
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
   * @param newTitle Updated title that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteTitle(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTitle: string
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newBody Updated body that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteBody(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newBody: string
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newCategories Updated categories that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteCategories(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newCategories: [string]
  ): Promise<AlterNoteMessage>;

  /**
   * @param userId MongoDB ID of the user.
   * @param noteIdMobile Mobile database ID of the note.
   * @param newTags Updated tags that will be saved.
   * @returns {Promise<AlterNoteMessage>} Update message of type AlterNoteMessage.
   * */
  updateNoteTags(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTags: [string]
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
