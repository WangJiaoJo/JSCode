/**
 * @Haoyang Li 
 * This file is for operate the application which 
 * show the five steps operations for the todoItems database.
 */
const todo = require("./todo");
const connection = require("./mongoConnection");

var firstId = undefined;
var secondId = undefined;

let addFirst = todo.createTask("Ponder Dinosaurs", 
"Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?")
.then((firstItems) => {
    console.log("Starting......");
    console.log("================ Step 1 Show the first Item ====================================")
    console.log("The first data has been created as follow: ");
    console.log(firstItems);
    firstId = firstItems._id;
})
.then((secondItems) => {
    return todo.createTask("Play Pokemon with Twitch TV", 
    "Should we revive Helix?").then((secondItems) => {
        console.log("================ Step 2 Show the Second Item ===============================")
        console.log("The second document has been created as follow: ");
        console.log(secondItems);
        secondId = secondItems._id;
    });
})
.then((items) => {
    console.log("================ Step 3 Show All the Items ====================================");
    console.log("All the items in the database: ")
    return todo.getAllTasks();
})
.then((items) => {
    return todo.removeTask(firstId).then((items) => {
        console.log("================ Step 4 Remove the first Items and Query All ==============");
        return todo.getAllTasks();
    });
})
.then(() => {
    return todo.completeTask(secondId)
    .then((items) => {
        console.log("================ Step 5 Complete the left task and Query     ==============")
        console.log(items);
    });
})
.catch((error) => {
    console.error(error);
})


