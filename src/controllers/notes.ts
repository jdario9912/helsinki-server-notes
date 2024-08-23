import { Request, Response } from "express";
import NoteModel from "../schemas/note";
import { Note } from "../types";

const getAllNotes = async (_: Request, res: Response) => {
  const notes = await NoteModel.find({});

  return res.json(notes);
};

const getNoteById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const note = await NoteModel.findById(id);

  if (!note) {
    res.statusMessage = `Note with id ${id} not found`;
    return res.status(404).end();
  }

  return res.json(note);
};

const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;

  const noteDeleted = await NoteModel.findOneAndDelete({ _id: id });

  if (!noteDeleted) {
    res.statusMessage = "Note not found";
    return res.status(404).end();
  }

  res.statusMessage = "Note deleted";
  return res.status(204).end();
};

const createNote = async (req: Request, res: Response) => {
  const noteRequest: Omit<Note, "id"> = req.body as Omit<Note, "id">;

  if (!noteRequest.content)
    return res.status(400).json({ error: "content missing" });

  const noteReview = {
    content: noteRequest.content,
    important: Boolean(noteRequest.important) || false,
    user: noteRequest.user,
  };

  const newNote = new NoteModel(noteReview);

  const savedNote = await newNote.save();

  return res.status(201).json(savedNote);
};

const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const noteToUpdate = req.body;

  const noteUpdated = await NoteModel.findByIdAndUpdate(
    { _id: id },
    noteToUpdate,
    { new: true }
  );

  return res.json(noteUpdated);
};

export default {
  getAllNotes,
  getNoteById,
  deleteNote,
  createNote,
  updateNote,
};
