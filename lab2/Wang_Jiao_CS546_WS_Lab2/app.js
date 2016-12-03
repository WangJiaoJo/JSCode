const fileData = require("./fileData");
const textMetrics = require("./textMetrics");

fileData.getFileAsString("test1.json").then((data) => {
	console.log("get file as string");
	console.log(data);
	
	fileData.saveStringToFile("test2.txt", data);
})
/*
.then((result) => {
	fileData.saveStringToFile("test2.txt", result);
})
*/
.catch((error) => {
	console.error(error);
	return;
})


fileData.getFileAsJSON("test1.json").then((data) => {
	console.log("get file as JSON");
	console.log(data);
	
	fileData.saveJSONToFile("test3.json", data);
})
/*
.then((result) => {
	fileData.saveJSONToFile("test3.json", result);
})
*/
.catch((error) => {
	console.error(error);
	return;
});

fileData.getFileAsString("chapter1.txt").then((data) => {
	return textMetrics.createMetrics(data);
})
.then((rs) => {
	console.log("Chapter1");
	console.log(rs);
	console.log("Chapter1");
	console.log(" ");
});


fileData.getFileAsString("chapter2.txt").then((data) => {
	return textMetrics.createMetrics(data);
})
.then((rs) => {
	console.log("Chapter2");
	console.log(rs);
	console.log("Chapter2");
	console.log(" ");
});


fileData.getFileAsString("chapter3.txt").then((data) => {
	return textMetrics.createMetrics(data);
})
.then((rs) => {
	console.log("Chapter3");
	console.log(rs);
	console.log("Chapter3");
	console.log(" ");
});



