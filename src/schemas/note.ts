import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  content: {
    type: String,
    minLenght: 5,
    required: true,
  },
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

noteSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

noteSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Note = model("Note", noteSchema);

export default Note;
