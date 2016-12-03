const express = require("express");
const router = express.Router();
const data = require("../data");
const classData = data.classes;
const queryString = require("query-string");

router.get("/", (req, res) => {
    classData.getAllClass().then((data) => {
        res.json(data);
    }, (error) => {
        console.error("Error in routes/classes");
        res.status(500).send();
    });
});

router.get("/details", (req, res) => {
    var qs = queryString.parse(req.url.split("?")[1]);
    var code = qs.code;
    classData.getURLByType(req.query.code).then((data) => {
        res.json(data);
    }, (error) => {
        console.error("Error in router/classes");
        res.status(500).send();
    });
});

module.exports = router;





