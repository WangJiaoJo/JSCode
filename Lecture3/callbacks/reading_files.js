const jsonFile = require("./jsonFileMod"); 
//const fs = require('fs');

console.log("start of code");

let numVowelsInNames = 0;
const vowels = ['a', 'e', 'i', 'o', 'u'];

let testString = "hello world";
let names = [];

let readTeamFiles = (file, callback) => {
	jsonFile.readJSON(file, callback);
}

//let jsonFileResult = jsonFile.readJSON("the-C-team.json");

let computeVowels = (peopleData) => {
	let nameData = {};
	let names = peopleData.map(person => person.name.toLowerCase());
	
	for (let i = 0; i < names.length; i++){
		let currentName = names[i];
		let currentNameVowels = 0;
		
		for(let i = 0; i < currentName.length; i++){
			if (vowels.indexOf(currentName[i]) >= 0){
				numVowelsInNames++;
				currentNameVowels++;
				//console.log(`Found a vowel: ${currentName[i]}`);
			}
		}
		
		nameData[currentName] = currentNameVowels;
	}
	
	return nameData;
};

let cTeamDataResult = jsonFile.readJSON("the-C-team.json");

cTeamDataResult.then((cTeamData) => {
	//console.log("This was a success");
	//console.log(data);
	
	return computeVowels(cTeamData);
}).catch((error) => {
	console.error("There was an error parsing the original file");
	return {};
}).then((cTeamData) => {
	return jsonFile.readJSON("the-Z-team.json").then((zdata) => {
		let zTeamNameData = computeVowels(zdata);
		//console.log(data);
		let endResult = {};
		
		Object.keys(cTeamData).forEach((key) => {
			endResult[key] = cTeamData[key];
		});
		Object.keys(zTeamNameData).forEach((key) => {
			endResult[key] = zTeamNameData[key];
		});
		
		return endResult;
	});
	//console.log(nameData);
}).then((allNameData) => {
	console.log(allNameData);
	return allNameData;
}).then((nameData) => {
	return jsonFile.writeJSON("name-data.json", nameData);
}).then(() => {
	console.log("Done writing results");
});
/*
jsonFile.readJSON("the-C-team.json", (error, asObject) => {
	if (error) throw error;
	
	//console.log("reading file");
	//var asObject = JSON.parse(data);
	
	asObject.forEach((person) => {
		names.push(person.name.toLowerCase());
	});
	
	let nameData = {};
	
	//console.log(names.length);
	for (let i = 0; i < names.length; i++){
		let currentName = names[i];
		let currentNameVowels = 0;
		
		for(let i = 0; i < currentName.length; i++){
			if (vowels.indexOf(currentName[i]) >= 0){
				numVowelsInNames++;
				currentNameVowels++;
				//console.log(`Found a vowel: ${currentName[i]}`);
			}
		}
		
		nameData[currentName] = currentNameVowels;
	}
	
	console.log(nameData);
	
	jsonFile.writeJSON("name-data.json", nameData, (error, data) => {
		if (error) throw error;
		jsonFile.readJSON("name-data.json", (error, data) => {
			
		});
		//console.log(data);
	});
	
	console.log(`we have ${numVowelsInNames} vowels in their names`);
});

for (let i = 0; i < testString.length; i++){
	if (vowels.indexOf(testString[i]) >= 0){
		console.log("Found a vowel");
	}
}

console.log("end of code");
*/