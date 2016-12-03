const express = require('express');
const router = express.Router();

router.get("/jquery-storage", (req, res) => {
    res.render("sample/jquery-storage", {
        partial: "jquery-storage-scripts"
    });
});

module.exports = router;