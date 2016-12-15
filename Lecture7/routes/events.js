const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const locationData = data.locations;
const eventData = data.events;
const path = require('path');

let route = path.resolve(`static/error.html`);

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page
	let event = {};
    // If a event is not found, display the 404 error page
	eventData.getEvent(req.params.id).then((eventInfo) => {
		event.event = eventInfo;
	}).then(() => {
		locationData.getLocation(event.event.location).then((locationInfo) => {
			event.location = locationInfo;
		}).then(() => {
			let attends = event.event.attendees;
			let persons = [];
			for (i = 0; i < attends.length; i++){
				peopleData.getPerson(attends[i]).then((people) => {
					persons.push(people);
				});
			};
			event.persons = persons;
			res.render("events/single", {event: event});
		});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
	eventData.getAllEvents().then((eventList) => {
		res.render("events/index", {events: eventList});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;