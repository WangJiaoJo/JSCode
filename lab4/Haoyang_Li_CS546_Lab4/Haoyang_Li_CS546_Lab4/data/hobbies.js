/**
 * @Haoyang Li
 * This module contains some operation to add, get, update or remove data
 * to the database. Specifically, this file is to the hobbies collection. 
 */
const mongoCollections = require("../config/mongoCollections");
const hobbies = mongoCollections.hobbies;
const uuid = require("node-uuid");

let exportedMethods = {
    getHobById(id) {
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({_id: id}).then((data) => {
                if (!data) throw "Hobbies Not Found";
                return data;
            });
        });
    },

    getAllHob() {
        return hobbies().then((hobCollection) => {
            return hobCollection.find({}, {_id:0, hobby:1}).toArray();
        });
    },

    getOneHob(hobby) {
        return hobbies().then((hobCollection) => {
            return hobCollection.findOne({hobby: hobby}).then((hob) => {
                if (!hob) throw "Hobby not found";
                return hob;
            });
        });
    },

    addHob(hobby, description) {
        return hobbies().then((hobCollection) => {
            let newHob = {
                _id: uuid.v4(),
                hobby: hobby, 
                description: description
            };

            return hobCollection.insertOne(newHob).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getHobById(newId);
            });
        });
    }
};

module.exports = exportedMethods;