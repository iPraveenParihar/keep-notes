const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String, required: true},
    noteText: {type: String, required: true},
    noteColor: {type: String, required: true},
    // createdDate: {type: Date, required: true},
},{timestamps: true});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;