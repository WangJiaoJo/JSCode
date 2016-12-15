const express = require('express');
const router = express.Router();
const data = require("../data");
const manipulate = data.manipulate;

router.get("/clientform", (req, res) => {
    res.render("manipulate/static", {});
});

router.get("/serverform", (req, res) => {
    res.render("manipulate/server", {});
});

router.post("/serverform", (req, res) => {
    let moderateText = req.body.moderateText;
    let insertedText = req.body.insertedText;
    let insertedTime = parseInt(req.body.insertedTime);
    let eachInsertNumber = parseInt(req.body.eachInsertNumber);
    let result;

    try {
        result = manipulate.insertText(moderateText, insertedText, insertedTime, eachInsertNumber);
    } catch(e) {
        res.render("manipulate/server", {moderateText: moderateText, insertedText: insertedText, insertedTime: insertedTime, eachInsertNumber: eachInsertNumber, error: e});
        return;
    }

    res.render("manipulate/server", {moderateText: moderateText, insertedText: insertedText, insertedTime: insertedTime, eachInsertNumber: eachInsertNumber, result: result});
});

module.exports = router;