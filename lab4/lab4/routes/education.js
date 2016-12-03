const express = require("express");
const router = express.Router();
const data = require("../data");
const eduData = data.education;

router.get("/", (req, res) => {
	eduData.getAllSchools().then((schoolList) => {
		res.json(schoolList);
	}, (error) => {
		console.log(error);
		res.sendStatus(500);
	});
});

router.get("/highschool", (req, res) => {
	eduData.getHighSchool("highschool").then((highschools) => {
		res.json(highschools);
	}, (error) => {
		console.log(error);
		res.sendStatus(404).json({message: "Not Found"});
	});
});

router.get("/undergrad", (req, res) => {
	eduData.getCollege("undergrad").then((college) => {
		res.json(college);
	}, (error) => {
		console.log(error);
		res.sendStatus(404).json({message: "Not Found"});
	});
});

module.exports = router;