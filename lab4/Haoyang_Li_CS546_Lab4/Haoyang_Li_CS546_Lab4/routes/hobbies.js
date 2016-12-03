const express = require("express");
const router = express.Router();
const data = require("../data");
const hobData = data.hobbies;

router.get("/", (req, res) => {
    hobData.getAllHob().then((data) => {
        res.json(data);
    }, () => {
        res.status(500).send();
    });
});

router.get("/:hobby", (req, res) => {
    hobData.getOneHob(req.params.hobby).then((data) => {
        res.json(data);
    }, (error) => {
        res.status(404).json({message: "Not Found"});
    });
});

module.exports = router;

