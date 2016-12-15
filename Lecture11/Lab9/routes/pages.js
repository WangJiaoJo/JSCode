const express = require('express');  
const router = express.Router();
const xss = require('xss');
const data = require("../data");
const noteData = data.notes;

router.get("/", (req, res) => {
    res.render("home");
})

router.get("/all", function (request, response) {
    noteData.getAllNotes().then((notes) => {
        response.render("pages/notes", {notes: notes});
    }).catch ((error) => {
        response.status(500).json({error: error});
    });
    
});

router.get("/new", (req, res) => {
    res.render("pages/new");
});
/*
router.post("notes/new", function (request, response) {
    notaData.createNote(xss(request.body.title), xss(request.body.noteSummary), xss(request.body.noteDate), xss(request.body.noteBody)).then((newNote) => {
        response.json({success: true, message: xss(newNote.id)});
    }).catch((e) => {
        response.json({success: false, message: e});
    });
});

router.get("/:note", (req, res) => {
    noteData.getNote(req.params.note).then((singleNote) => {
        res.render("pages/note", {note: singleNote});
    });
});

router.get("/next/:note", (req, res) => {
    noteData.getNextNote(req.params.note).then((nextNote) => {
        res.json({success: true, message: nextNote.due_date});
    });
});
*/

router.post("/new/note", function (request, response) {
     let newNote = request.body;
     console.log(newNote);
     noteData.addNote(newNote).then((newNote) => {
        response.json({success: true, "id": newNote.id});
    }).catch((error) => {
        response.status(500).json({error: error});
    });
})

router.get("/:id", function (req, res) {
    noteData.getNote(req.params.id).then((noteInfo) => {
        console.log(noteInfo);
        res.render("pages/note", {note: noteInfo});
    }).catch((error) => {
        // res.status(500).json({error: "Error"});
        console.error(error);
    });
});

module.exports = router;
