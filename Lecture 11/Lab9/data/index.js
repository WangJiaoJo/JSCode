module.exports = {
    notes: require("./notes")
}
/*
let currId = 0; 
let noteListEntries = [];

let createNote = function (title, noteSummary, noteDate, noteBody) {
    if (!title) throw "Must provide a title";
    if (!noteSummary) throw "Must provide a note summary";
    if (!noteDate) throw "Must choose a note date";
    if (!noteBody) throw "Must provide a note body";

    let newNote = { id: ++currId, title: title, noteSummary: noteSummary, noteDate: noteDate, noteBody: noteBody};

    noteListEntries[newNote.id] = newNote;
    return newNote;
};

let getNote = function (id) {
    if (!noteListEntries[id]) throw "No such entrie exists.";
    return noteListEntries[id];
};

let updateNote = function (id, newTitle, newNote) {
    let entry = getNote(id);
    if (newTitle) entry.title = newTitle;
    if (newNote) entry.note = newNote;

    return entry;
};

let getAll = function () {
    return Object.keys(noteListItems).map(function (key) {
        return noteListItems[key];
    });
};

let getNextNote = function (id) {
    if (!noteListEntries[id + 1]) throw "No such entrie exists.";
    return noteListEntries[id + 1];
}

module.exports = {
    createNote: createNote,
    getNote: getNote,
    updateNote: updateNote,
    getAll: getAll
};

module.exports.createNote("Note Title", "Note Summary", "Note Date", "Note Body");
*/