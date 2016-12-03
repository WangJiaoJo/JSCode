const express = require('express');
const router = express.Router();
const data = require("../data");
const locationData = data.locations;
const eventData = data.events;
const path = require('path');

let route = path.resolve(`static/error.html`);
// Single Location Page
router.get("/:id", (req, res) => {
    // Find a location by the provided id, 
    // then display its information
    // As well as listing all events that will be at this location
    // Each of these events need to link to the event page and show the event name
    // If a location is not found, display the 404 error page
	let location = {};
	locationData.getLocation(req.params.id).then((locationInfo) => {
		location.locationInfo = locationInfo;
	}).then(() => {
		eventData.getEventForLocation(req.params.id).then((eventList) => {
			location.events = eventList;
			res.render("locations/single", {location: location});
		});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page
router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page
	locationData.getAllLocations().then((locationList) => {
		res.render("locations/index", {locations: locationList});
	}).catch(() => {
		res.sendFile(route);
	});
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;