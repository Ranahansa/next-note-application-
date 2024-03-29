import mongoose, { Document, Schema } from "mongoose";

interface INoteDocument extends Document{
    title: string;
    description: string;
}

const NoteSchema : Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
})

const Note = mongoose.model<INoteDocument>("Note", NoteSchema);

export default Note;