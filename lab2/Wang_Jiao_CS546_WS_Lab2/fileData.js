const fs = require('fs');

let jsonFile = exports = module.exports;

jsonFile.getFileAsString = (path) => {
	return new Promise((fulfill, reject) => {
		if(!path || path == undefined) throw "No string path provided";
		fs.readFile(path, "utf-8", (error, data) => {
			if (error){
				reject(error);
				//return;
			}
			fulfill(data);
		});
	});
};

jsonFile.getFileAsJSON = (path) => {
	return new Promise((fulfill, reject) => {
		if(!path || path == undefined) throw "No JSON path provided";
		fs.readFile(path, "utf-8", (error, data) => {
			if (error){
				reject(error);
				//return;
			}
			try{
				let jsonData = JSON.parse(data);
				fulfill(jsonData);
			} catch(parsingError) {
				reject(parsingError);
			}
		});
	});
};

jsonFile.saveStringToFile = (path, text) => {
	return new Promise((fulfill, reject) => {
		if(!path || path == undefined) throw "No string path provided";
		if(!text || text == undefined) throw "No string text provided";
		fs.writeFile(path, text, (error, callback) => {
			if (error){
				reject(error);
				//return;
			}
			fulfill(true);
		});
	});
};

jsonFile.saveJSONToFile = (path, obj) => {
	return new Promise((fulfill, reject) => {
		if(!path || path == undefined) throw "No JSON path provided";
		if(!obj || obj == undefined) throw "No JSON object provided";
		fs.writeFile(path, JSON.stringify(obj, null, 4), (error, callback) => {
			if (error){
				reject(error);
				//return;
			}
			fulfill(true);
		});
	});
};

