// import Note from "../schemas/note";

export const info = async () => {
  // const notes = await Note.find({});

  return `
    <p>Notesbook has info for some notes</p>
    <br/>
    <p>${new Date().getDate()} ${
    new Date().getMonth() + 1
  } ${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}</p>
`;
};
