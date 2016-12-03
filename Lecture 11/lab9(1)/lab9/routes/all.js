const express = require('express'); 
const router = express.Router();
const xss = require('xss');
const data = require('../data');
const notesData = data.notes;

router.get("/", function (request, response) {
    notesData.getAllNotes().then((notes) => {
        response.render("pages/all", {notes: notes});
    }).catch ((error) => {
        response.status(500).json({error: error});
    });
    
});

router.get("/new", function (request, response) {
    // console.log("suceese get new page");
    // let newNote = request.body;
    response.render("pages/new");
    // notesData.addNote(newNote).then((newNote) => {
    //     response.json({success: true, "id": newNote.id});
    // }).catch((error) => {
    //     response.status(500).json({error: error});
    // });
});

router.get("/single/:id", function (req, res) {
    notesData.getNote(req.params.id).then((noteInfo) => {
        console.log(noteInfo);
        res.render("pages/single", {note: noteInfo});
    }).catch((error) => {
        // res.status(500).json({error: "Error"});
        console.error(error);
    });
});

module.exports = router;