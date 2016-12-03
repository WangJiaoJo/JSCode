const express = require("express");
const router = express.Router();
const data = require("../data");
const hobbyData = data.hobbies;

router.get("/", (req, res) => {
	hobbyData.getAllHobbies().then((hobbyList) => {
		res.json(hobbyList);
	}, (error) => {
		console.log(error);
		res.sendStatus(500);
	});
});

router.get("/:hobby", (req, res) => {
	hobbyData.getHobbyByName(req.params.hobby).then((hobbies) => {
		res.json(hobbies);
	}, (error) => {
		console.log(error);
		res.status(404).json({message: "Not Found"});
	});
});

module.exports = router;