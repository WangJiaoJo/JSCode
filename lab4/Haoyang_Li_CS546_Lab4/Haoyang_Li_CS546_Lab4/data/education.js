/**
 * @Haoyang Li
 * This module contains some operation to add, get, update or remove data
 * to the database. Specifically, this file is to the education collection. 
 */
const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const uuid = require("node-uuid");

let exportedMethods = {

    getAllEdu() {
        return education().then((eduCollection) => {
            return eduCollection.find({}, {_id: 0, name: 1}).toArray();
        });
    },

    getEduByHigh(highschool) {
        return education().then((eduCollection) => {
            return eduCollection.findOne({type: "highschool"}, {_id:0, name:1}).then((edu) => {
                if (!edu) throw "Edu not found";
                return edu;
            });
        });
    },

    getEduByUnder(undergrad) {
        return education().then((eduCollection) => {
            return eduCollection.findOne({type: "undergrad"}, {_id:0, name:1, degree:1}).then((edu) => {
                if (!edu) throw "Edu not found";
                return edu;
            });
        });
    },

    addEdu(name, degree, type) {
        return education().then((eduCollection) => {
            let newEdu = {
                _id: uuid.v4(),
                name: name,
                degree: degree, 
                type: type
            };
            return eduCollection.insertOne(newEdu);
        });
    },
};
module.exports = exportedMethods;