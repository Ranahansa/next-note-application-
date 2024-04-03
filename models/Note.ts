import { model, models, Schema } from "mongoose";

const noteSchema = new Schema({
    title: String,
    description: String,
});

const Note = models.Note || model("Note", noteSchema);

export default Note;
