/**
 * @Haoyang Li 
 * This module defined five functions which realizes get one document of task, 
 * create task for the specific title and description, 
 * remove the task which provided the specific identifier, 
 * mark the specific task of complited with the specific time stamp.
 */
const mongoCollections = require('./mongoCollections');
const todoItems = mongoCollections.todoItems;
var uuid = require('node-uuid');

let exportedMethods = {
    getTask(id) {
        if (!id)
            return Promise.reject("Id is required when you search for it.");
        return todoItems().then((todoItemsCollection) => {
            return todoItemsCollection.findOne({_id: id});
        });
    }, 

    createTask(title, description) {
        if (!title)
            return Promise.reject("Title is required for your task!")
        if (!description) 
            return Promise.reject("Description is required for your task!")
        
        return todoItems().then((todoItemsCollection) => {
            let newItem = {
                _id: uuid.v4(),
                title: title,
                description: description, 
                completed: false,
                completedAt: null
            }
            // why inset and return it???????
            return todoItemsCollection
            .insertOne(newItem)
            .then((newInsertInformation) => {
                // what is insertedId??????
                return newInsertInformation.insertedId;
            })
            .then((newId) => {
                return this.getTask(newId);
            });
        });
    },

    getAllTasks() {
        return todoItems().then((todoItemsCollection) => {
            return todoItemsCollection.find().forEach((items) => {
                console.log(items);
            })
        });
    },

    

    completeTask(taskId) {
        if (!taskId)
            return Promise.reject("Id id required when you update it.");
        
        return todoItems().then((todoItemsCollection) => {
            // var updateItem = this.getTask(taskId);
            // updateItem.completed = true;
            // updateItem.completedAt = new Date();

            return todoItemsCollection.update(
                { _id: taskId}, 
                { $set: 
                    {
                        completed: true,
                        completedAt: new Date()
                    }
                }
            )
            .then(() => {
                return this.getTask(taskId);
            });
        });
    }, 

    removeTask(id) {
        if (!id)
            return Promise.reject("Id is required when you remove task!");
        return todoItems().then((todoItemsCollection) => {
            return todoItemsCollection
            .removeOne({_id: id})
            .then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw(`Could not delete the task with id of ${id}`);
                }
            });
        });
    }
};

module.exports = exportedMethods;