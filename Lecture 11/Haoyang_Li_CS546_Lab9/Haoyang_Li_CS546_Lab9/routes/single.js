const express = require('express');
const router = express.Router();
const xss = require('xss');
const data = require('../data');
const notesData = data.notes;

router.get("/:id", function (req, res) {
    notesData.getNote(req.params.id).then((noteInfo) => {
        console.log(noteInfo);
        res.render("pages/single", {note: noteInfo});
    }).catch((error) => {
        // res.status(500).json({error: "Error"});
        console.error(error);
    });
});

module.exports = router;