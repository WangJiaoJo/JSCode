const express = require('express'); 
const router = express.Router();
const data = require('../data');
const notesData = data.notes;
const xss = require('xss');

router.get("/", function (request, response) {
    // console.log("suceese get new page");
   
    response.render("pages/new");
    
});
//Attention, if you want to add the new note post to other page, you need to use this post method. 
router.post("/note", function (request, response) {
     let newNote = request.body;
     console.log(newNote);
     notesData.addNote(newNote).then((newNote) => {
        response.json({success: true, "id": newNote.id});
    }).catch((error) => {
        response.status(500).json({error: error});
    });
})

module.exports = router;