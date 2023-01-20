import { AlterNoteMessage, ObjectIdMongoose } from "../IDao";
import { NoteType } from "../../data/database/notesModel";

export type IRepository = {
  createNote(userId: ObjectIdMongoose, note: NoteType): Promise<boolean>;

  getNotes(userId: ObjectIdMongoose): Promise<[NoteType]>;

  getNoteById(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<NoteType>;

  updateNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage>;

  updateNoteTitle(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTitle: string
  ): Promise<AlterNoteMessage>;

  updateNoteBody(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newBody: string
  ): Promise<AlterNoteMessage>;

  updateNoteCategories(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newCateogries: [string]
  ): Promise<AlterNoteMessage>;

  updateNoteTags(
    userId: ObjectIdMongoose,
    noteIdMobile: string,
    newTags: [string]
  ): Promise<AlterNoteMessage>;

  deleteNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<AlterNoteMessage>;
};
