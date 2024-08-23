import NoteModel from "../../schemas/note";
import { Note } from "../../types";

export const notesInDb = async (): Promise<Note[]> => {
  const notes = await NoteModel.find({});
  return notes.map((note) => note.toJSON());
};
