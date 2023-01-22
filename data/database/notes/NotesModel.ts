import { InferSchemaType, model, Schema } from "mongoose";

/** Schema of the notes.
 *
 * Contains variable information and rules associated with them.
 * */
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: false,
    default: "",
  },

  tags: {
    type: [String],
    required: false,
    default: [],
  },

  categories: {
    type: [String],
    required: false,
    default: [],
  },

  savedBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  noteIdMobile: {
    type: String,
    required: true,
  },
});

/**`NoteType` refers to the type definition being saved in the database.*/
export type NoteType = InferSchemaType<typeof NoteSchema>;

/**MongoDB model we are working on to make operations on notes.*/
export const NoteModel = model<NoteType>("Note", NoteSchema);
