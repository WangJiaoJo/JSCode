const express = require("express");
const router = express.Router();
const data = require("../data");
const eduData = data.education;

router.get("/", (req, res) => {
    eduData.getAllEdu().then((data) => {
        res.json(data);
    }, (error) => {
        console.error("Error in routes/education");
        res.status(500).send();
    });
});

router.get("/highschool", (req, res) => {
    eduData.getEduByHigh("highschool").then((data) => {
        res.json(data);
    }, (error) => {
        res.status(404).json({message: "Not Found"});
    });
});

router.get("/undergrad", (req, res) => {
    eduData.getEduByUnder("undergrad").then((data) => {
        res.json(data);
    }, (error) => {
        res.status(404).json({message: "Not Found"});
    });
});

module.exports = router;

