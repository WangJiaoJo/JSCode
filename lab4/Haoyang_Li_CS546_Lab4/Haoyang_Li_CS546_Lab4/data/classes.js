/**
 * @Haoyang Li
 * This module contains some operation to add, get, update or remove data
 * to the database. Specifically, this file is to the classes collection. 
 */
const mongoCollections = require("../config/mongoCollections");
const classes = mongoCollections.classes;
const uuid = require("node-uuid");


let exportedMethods = {
    getClassById(id) {
        return classes().then((classesCollection) => {
            return classesCollection.findOne({_id: id}).then((data) => {
                if (!data) throw "Class Not Found";
                return data;
            });
        });
    },

    getAllClass() {
        return classes().then((claCollection) => {
            return claCollection.find({}, {_id:0, code:1}).toArray();
        });
    },

    getURLByType(code) {
        return classes().then((claCollection) => {
            return claCollection.find({code: code}).toArray();
        })
    },

    addClass(code, name, professor, description) {
        return classes().then((classesCollection) => {
            let newClass = {
                _id: uuid.v4(),
                code: code, 
                name: name, 
                professor: professor,
                description: description
            };

            return classesCollection.insertOne(newClass).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getClassById(newId);
            });
        });
    }
};

module.exports = exportedMethods;