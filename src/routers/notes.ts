import { Router } from "express";
import notes from "../controllers/notes";

const router = Router();

router.get("/", notes.getAllNotes);

router.get("/:id", notes.getNoteById);

router.delete("/:id", notes.deleteNote);

router.post("/", notes.createNote);

router.patch("/:id", notes.updateNote);

export default router;
