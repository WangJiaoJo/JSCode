const express = require("express");
const router = express.Router();
const data = require("../data");
const classData = data.classes;
//const queryString = require("query-string");

router.get("/", (req, res) => {
	classData.getAllClasses().then((classList) => {
		res.json(classList);
	}, (error) => {
		console.log(error);
		res.sendStatus(500);
	});
});

router.get("/details", (req, res) => {
	/*
	var qs = queryString.parse(req.url.split("?")[1]);
	var code = qs.code;
	*/
	classData.getClassByCode(req.query.code).then((classList) => {
		res.json(classList);
	}, (error) => {
		console.log(error);
		res.sendStatus(500);
	});
});

module.exports = router;