const mongoCollection = require("../config/mongoCollections");
const education = mongoCollection.education;
const uuid = require("node-uuid");

let exportedMethods = {
	addSchool(name, type, degree){
		if (!name) return Promise.reject("name is not provided");
		if (!type) return Promise.reject("type is not provided");
		
		return education().then((schoolCollection) => {
			let newSchool = {
				_id: uuid.v4(),
				name: name,
				type: type,
				degree: degree
			};
			
			return schoolCollection.insertOne(newSchool);
		});
	},
	
	getAllSchools(){
		return education().then((schoolCollection) => {
			return schoolCollection.find({}, {name: 1, _id: 0}).toArray();
		});
	},
	
	getHighSchool(highschool){
		return education().then((schoolCollection) => {
			return schoolCollection.findOne({type: "highschool"}, {name: 1, _id: 0}).then((highschools) => {
				if (!highschools) throw "high school is not found";
				return highschools;
			});
		});
	},
	
	getCollege(undergrad){
		return education().then((schoolCollection) => {
			return schoolCollection.findOne({type: "undergrad"}, {name: 1, degree: 1, _id: 0}).then((college) => {
				if (!college) throw "college is not found";
				return college;
			});
		});
	}
};

module.exports = exportedMethods;