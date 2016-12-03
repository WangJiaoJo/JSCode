var uuid = require('node-uuid');
var dateFormat = require('dateformat');
const mongoCollections = require("./mongoCollections");
const tasks = mongoCollections.tasks;

let exportedMethods = {
	getTask(id) {
		if (!id){
			return Promise.reject("id is not a uuid");
		}
		
		return tasks().then((taskCollection) => {
			return taskCollection.findOne({_id: id});
		});
	},
	
	createTask(title, description) {
		if (typeof title != "string" || title == undefined){
			return Promise.reject("title is not a string");
		}
		
		if (typeof description != "string" || description == undefined){
			return Promise.reject("description is not a string");
		}
		
		return tasks().then((taskCollection) => {
			let newTask = {
				_id: uuid.v4(),
				title: title,
				description: description,
				completed: false,
				timeCompleted: null
			};
			
			return taskCollection
				   .insertOne(newTask)
				   /*
				   .then((newTask) => {
					   return Promise.fulfill(newTask);
				   });
				   */
				   
				   .then((newInsertInformation) => {
					   return newInsertInformation.insertedId;
				   })
				   .then((newId) => {
					   return this.getTask(newId);
				   });
				   
		});
	},
	
	getAllTasks() {
		return tasks().then((taskCollection) => {
			return taskCollection.find().toArray().then((task) => {
				console.log(task);
			});
		});
	},
	
	completeTask(id) {
		if (!id) {
			throw "taskId is not a uuid";
		}
		
		return tasks().then((taskCollection) => {
			let completedTask = {
				$set:
					{
						completed: true,
						timeCompleted: dateFormat(new Date())
					}
				
			};
			
			return taskCollection.updateOne({
				_id: id
			}, completedTask).then(() => {
				return this.getTask(id);
			});
		});
	},
	
	removeTask(id) {
		if (!id){
			return Promise.reject("id is not a uuid");
		}
		
		return tasks().then((taskCollection) => {
			return taskCollection
				   .removeOne({_id: id})
				   .then((deletionInfo) => {
					   if (deletionInfo.deletedCount === 0){
						   throw (`Could not delete task with id of ${id}`);
					   }
				   });
		});
	}
}

module.exports = exportedMethods;