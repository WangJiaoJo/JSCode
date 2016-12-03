const mongoCollection = require("../config/mongoCollections");
const hobbies = mongoCollection.hobbies;
const uuid = require("node-uuid");

let exportedMethods = {
	getHobbyById(id){
		return hobbies().then((hobbyCollection) => {
			return hobbyCollection.findOne({_id: id}).then((data) => {
				if (!data) throw "Hobbies not found";
			});
		});
	},
	
	getHobbyByName(name){
		//if (!name) return Promise.reject("name should be provided");
		return hobbies().then((hobbyCollection) => {
			return hobbyCollection.findOne({name: name}).then((hobby) => {
				if (!hobby) throw "Hobby is not found";
				return hobby;
			});
		});
	},
	
	addHobby(name, description){
		if (!name) return Promise.reject("name is not provided");
		if (!description) return Promise.reject("description is not provided");
		
		return hobbies().then((hobbyCollection) => {
			let newHobby = {
				_id: uuid.v4(),
				name: name,
				description: description
			};
			
			return hobbyCollection.insertOne(newHobby)
				.then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                }).then((newId) => {
                    return this.getHobbyById(newId);
				});
		});
	},
	
	getAllHobbies(){
		return hobbies().then((hobbyCollection) => {
			return hobbyCollection.find({}, {name: 1, _id: 0}).toArray();
		});
	}

};

module.exports = exportedMethods;
