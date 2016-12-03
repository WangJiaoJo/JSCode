const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const classes = data.classes;
const education = data.education;
const hobbies = data.hobbies;

dbConnection().then(db => {
	return db.dropDatabase().then(() => {
		return dbConnection;
	}).then((db) => {
		return classes.addClasses("CS-546", "Web Programming", "Phil Barresi", "Node.js");
	}).then((insertedInfo) => {
		return classes.addClasses("CS-519", "Introduction to E-Commerce", "Gene Super", "E-Commerce");
	}).then((insertedInfo) => {
		return classes.addClasses("CPE-593", "Applied Data Structure and Algorithms", "Dov Kruger", "Algorithms");
	}).then((insertedInfo) => {
		return classes.addClasses("EE-810P", "Engineering Programming: Python", "Mukundan Iyengar", "Python");
	}).then((insertedInfo) => {
		return education.addSchool("The Middle School Affliated to Southwest University", "highschool")
	}).then((insertedInfo) => {
		return education.addSchool("Southwest Jiaotong University", "undergrad", "Bachelor")
	}).then((insertedInfo) => {
		return education.addSchool("Stevens Institute of Technology", "Graduate University", "Master");
	}).then((insertedInfo) => {
		return hobbies.addHobby("reading", "I like reading books.");
	}).then((insertedInfo) => {
		return hobbies.addHobby("music", "I like listening to music.");
	}).then((insertedInfo) => {
		return hobbies.addHobby("shopping", "I like shopping.");
	}).then(() => {
		console.log("Done seeding database");
		db.close();
	});
}).catch((error) => {
	console.error(error);
});