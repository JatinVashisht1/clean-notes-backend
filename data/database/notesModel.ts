import { InferSchemaType, model, Schema } from "mongoose";

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

export type NoteType = InferSchemaType<typeof NoteSchema>;
export const NoteModel = model("Note", NoteSchema);
