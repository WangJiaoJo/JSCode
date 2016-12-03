const fs = require('fs');

let jsonFile = exports = module.exports;

jsonFile.getFileAsString = (fileName, callback) => {
	return new Promise((fulfill, reject) => {
		if(!fileName) throw "No file name provided";
		fs.readFile(fileName, "utf-8", (error, data) => {
			if (error){
				reject(error);
				return;
			}
			try{
				let jsonData = JSON.parse(Data);
				fulfill(jsonData);
			} catch(parsingError) {
				reject(parsingError);
			}
		})
	})
}