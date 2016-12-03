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

module.exports = router;