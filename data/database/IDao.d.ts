import { Schema } from "mongoose";
import { NoteType } from "./NotesModel";

type ObjectIdMongoose = Schema.Types.ObjectId;

export type AlterNoteMessage = {
  acknowledged: boolean;
  rowsAffected: number;
};

export type IDao = {
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

  deleteNote(
    userId: ObjectIdMongoose,
    noteIdMobile: string
  ): Promise<AlterNoteMessage>;
};
