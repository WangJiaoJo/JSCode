const mongoCollection = require("../config/mongoCollections");
const classes = mongoCollection.classes;
const uuid = require("node-uuid");

let exportedMethods = {
	getClassById(id){
		return classes().then((classCollection) => {
			return classCollection.findOne({_id: id}).then((data) => {
				if (!data) throw "Class not found";
				return data;
			})
		})
	},
	
	addClasses(code, name, professor, description){
		if (!code) return Promise.reject("code is not provided");
		if (!name) return Promise.reject("name is not provided");
		if (!professor) return Promise.reject("professor is not provided");
		if (!description) return Promise.reject("description is not provided");
		
		return classes().then((classCollection) => {
			let newClass = {
				_id: uuid.v4(),
				code: code,
				name: name,
				professor: professor,
				description: description
			};
			
			return classCollection.insertOne(newClass).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getClassById(newId);
			});
		});
	},
	
	getAllClasses(){
		return classes().then((classCollection) => {
			return classCollection.find({}, {code: 1, _id: 0}).toArray();
		});
	},
	
	getClassByCode(code){
		if (!code) return Promise.reject("code should be provided");
		
		return classes().then((classCollection) => {
			return classCollection.find({code: code}, {name: 1, professor: 1, description: 1, _id: 0}).toArray();
		});
	}
};

module.exports = exportedMethods;