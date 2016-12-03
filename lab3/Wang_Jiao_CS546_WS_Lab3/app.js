const todoItems = require("./todo");

let createdTask = todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like");
createdTask.then((newTask) => {
	console.log("The first task has been created.");
	console.log(newTask);
	newTaskId = newTask._id;
})

.then((newTask1) => {
	return todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?").then((newTask1) => {
		console.log("The second task has been created.");
		console.log(newTask1);
		newTaskId1 = newTask1._id;
	});
})

.then((task) => {
	console.log("All Tasks:");
	return todoItems.getAllTasks();
})

.then(() => {
	console.log("The first task has been removed.");
	return todoItems.removeTask(newTaskId);
})

.then((task) => {
	console.log("After remove the first task");
	return todoItems.getAllTasks();
})

.then(() => {
	console.log("The task has been completed.")
	return todoItems.completeTask(newTaskId1).then((newTask) => {
		console.log("The completed task is")
		console.log(newTask);
	});
})

.then((task) => {
	console.log("After complete the second task");
	return todoItems.getAllTasks();
})

.catch((error) => {
	console.error(error);
});



