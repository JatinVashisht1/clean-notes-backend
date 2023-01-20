import { Schema } from "mongoose";
import { NoteType } from "./notesModel";

type ObjectIdMongoose = Schema.Types.ObjectId;

export type AlterNoteMessage = {
  acknowledged: boolean;
  rowsAffected: number;
};

export type IDao = {
  createNote(userId: ObjectIdMongoose, note: NoteType): Promise<Booelan>;
  getNotes(userId: ObjectIdMongoose): Promise<[NoteType]>;
  getNoteById(userId: ObjectIdMongoose, noteId: string): Promise<NoteType>;
  updateNote(
    userId: ObjectIdMongoose,
    noteId: string,
    newNote: NoteType
  ): Promise<AlterNoteMessage>;
  deleteNote(
    userId: ObjectIdMongoose,
    noteId: string
  ): Promise<AlterNoteMessage>;
};
