const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

const NotesModel = mongoose.model("notes", NotesSchema);

module.exports = NotesModel;