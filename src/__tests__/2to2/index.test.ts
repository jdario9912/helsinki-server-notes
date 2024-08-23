import { describe, test, beforeEach, after } from "node:test";
import assert from "node:assert";
import { api } from "../config";
import NoteModel from "../../schemas/note";
import { initialNotes } from "../moks/notes";
import { disconnectDB } from "../../db/mongo";
import { notesInDb } from "../utils/notes";
import { Note, User } from "../../types";
import { usersInDb } from "../utils/users";
import { initialUsers } from "../moks/users";
import UserModel from "../../schemas/user";

beforeEach(async () => {
  await NoteModel.deleteMany({});
  const notesObject = initialNotes.map((note) => new NoteModel(note));
  const asyncSavedNotes = notesObject.map((note) => note.save());
  await Promise.all(asyncSavedNotes);

  await UserModel.deleteMany({});
  const usersObject = initialUsers.map((user) => new UserModel(user));
  const asyncSavedUsers = usersObject.map((user) => user.save());
  await Promise.all(asyncSavedUsers);
});

describe("end to end test", () => {
  describe("info", () => {
    test("deberia retornar status 200 y html", async () => {
      await api
        .get("/api/info")
        .expect(200)
        .expect("Content-type", /text\/html/);
    });
  });

  describe("notes", () => {
    test("should be notes in db", async () => {
      const notesSaved = await notesInDb();

      assert.equal(initialNotes.length, notesSaved.length);
    });

    test("get all notes", async () => {
      const res = await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert(res.body.length === initialNotes.length);
    });

    describe("get a note by id", () => {
      test("deberia retornar una nota", async () => {
        const notes = await notesInDb();
        const noteToTest = notes[0];

        const res = await api
          .get(`/api/notes/${noteToTest.id}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        assert.deepStrictEqual(noteToTest, res.body);
      });

      test("deberia retornar status 400, id no valido", async () => {
        const anyId = "66358ded98d60c5acfa0341";
        await api.get(`/api/notes/${anyId}`).expect(400);
      });

      test("deberia retornar status 404, nota no encontrada", async () => {
        const anyId = "26358ded98d60c5acfa03413";
        await api.get(`/api/notes/${anyId}`).expect(404);
      });
    });

    describe("creat", async () => {
      const usersSaved = await usersInDb();

      const userToTest = usersSaved[0];

      const newNote: Omit<Note, "id"> = {
        content: "Testing add new notes in db",
        important: false,
        user: userToTest.id,
      };

      
      
      test("adding a new note", async () => {
        await api
          .post("/api/notes")
          .send(newNote)
          // .expect(201)
          // .expect("Content-Type", /application\/json/);

      // assert.deepEqual(res.body.content, newNote.content);

      // const notesSaved = await notesInDb();

      // const contents = notesSaved.map((note) => note.content);

      // assert(contents.includes(newNote.content));

      // assert.equal(res.body.user, newNote.user);
      });
    });

    test("deleting a note", async () => {
      const notesSavedBefore = await notesInDb();

      const noteToDelete = notesSavedBefore[1];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesSavedAfter = await notesInDb();

      assert.equal(notesSavedBefore.length - 1, notesSavedAfter.length);
    });

    describe("update note", () => {
      test("should return status 200", async () => {
        const notesSaved = await notesInDb();

        const { content, important, id } = notesSaved[0];

        await api
          .patch(`/api/notes/${id}`)
          .expect(200)
          .send({ content, important: !important });
      });

      test("important should be negated", async () => {
        const notesSaved = await notesInDb();

        const { content, important, id } = notesSaved[0];

        const res = await api
          .patch(`/api/notes/${id}`)
          .send({ important: !important, content });

        assert.notEqual(res.body.important, important);
      });
    });
  });

  describe.skip("users", () => {
    test("should be users in db", async () => {
      const usersSaved = await usersInDb();

      assert.equal(initialUsers.length, usersSaved.length);
    });

    describe("create", () => {
      describe("ok", () => {
        test("should add new user", async () => {
          const usersBefore = await usersInDb();

          const newUser: Omit<User, "id"> = {
            name: "Homero Simpson",
            username: "simpson",
            password: "wasi*waso-123",
          };

          const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

          const usersAfter = await usersInDb();

          assert.equal(usersBefore.length + 1, usersAfter.length);
          assert.equal(newUser.name, res.body.name);

          const usernames = usersAfter.map((user) => user.username);

          assert(usernames.includes(newUser.username));
        });
      });

      // describe("fail", () => {

      // test("should return status 400", async () => {});
      // })
    });

    describe("get", () => {
      test("get all users", async () => {
        const userSaved = await usersInDb();
        const res = await api
          .get("/api/users")
          .expect(200)
          .expect("Content-Type", /application\/json/);

        assert.equal(res.body.length, userSaved.length);
      });
    });
  });

  after(async () => disconnectDB());
});
