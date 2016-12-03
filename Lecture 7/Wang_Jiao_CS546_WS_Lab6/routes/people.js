const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const eventData = data.events;
const path = require('path');

let route = path.resolve(`static/error.html`);
// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id, 
    // then display their information
    // As well as listing all events that they will be attending
    // Each of these events need to link to the event page, and show the event name
    // If a person is not found, display the 404 error page
	let person = {};
	peopleData.getPerson(req.params.id).then((people) => {
		person.people = people;
	}).then(() => {
		eventData.getEventsForAttendee(req.params.id).then((peopleEventList) => {
			person.events = peopleEventList;
			res.render("people/single", {person: person});
		});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// People Index Page
router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page
	peopleData.getAllPeople().then((persons) => {
		res.render("people/index", {persons: persons});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;