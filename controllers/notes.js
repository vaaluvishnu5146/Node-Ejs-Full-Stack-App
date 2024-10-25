const NotesModel = require('../models/notes.model');

async function fetchAllNotes() {
    return NotesModel.find();
}

async function fetchNoteWithId(noteId) {
    return NotesModel.findOne({ _id: noteId });
}


module.exports = { fetchAllNotes, fetchNoteWithId };