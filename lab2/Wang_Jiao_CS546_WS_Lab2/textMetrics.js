
const HashMap = require('hashmap').HashMap;
let map = new HashMap();
let textMetrics = exports = module.exports;

/*
const HashMap = require('hashmap').HashMap;
let map = new HashMap();
let textMetrics = exports = module.exports;
*/

textMetrics.createMetrics = (text) => {
	return new Promise((fulfill, reject) => {
		if(!text || text == undefined) reject ("No text provided");
		
		var word = text.replace(/[,\[\];:()".?!-']/g, " ").replace(/\s+/g, " ");
		if (word.length == 0) reject ("No text provided");
		
		let numberOfSentences = 0;
		
		text = text.replace(/[,\[\];:()"]/g, " ").replace(/\s+/g, " ").toLowerCase();
		
		let startIndex = 0;

		for (i = 0; i < text.length; i++){
			let currentIndex = text.substring(i, i + 1);
			if (!/[a-zA-Z]/i.test(currentIndex)) {
				if (currentIndex == "-"){
					if (text.substring(i, i + 2) == "--"){
						let currentWord = text.substring(startIndex, i).replace(/[']/g, "");
						if (map.has(currentWord)){
							map.set(currentWord, map.get(currentWord) + 1);
						} else {
							map.set(currentWord, 1);
						}
						startIndex = i + 2;
					}		
				} else if (currentIndex == "." || currentIndex == "?" || currentIndex == "!"){
					let currentWord = text.substring(startIndex, i).replace(/[']/g, "");
					if (currentIndex == "." && (currentWord == "mr" || currentWord == "mrs")){
						currentWord = text.substring(startIndex, i + 1);
					} else {
						numberOfSentences++;
					}
					if (map.has(currentWord)){
						map.set(currentWord, map.get(currentWord) + 1);
					} else {
						map.set(currentWord, 1);
					}
					startIndex = i + 1;
				} else if (currentIndex == " "){
					let currentWord = text.substring(startIndex, i).replace(/[']/g, "");
					if (currentWord != " "){
						if (map.has(currentWord)){
							map.set(currentWord, map.get(currentWord) + 1);
						} else {
							map.set(currentWord, 1);
						}
						startIndex = i + 1;
					}
				}
			}
		}
		
		let rs = {};
		let totalLetters = 0;
		let totalWords = 0;
		let uniqueWords = 0;
		let longWords = 0;
		let averageWordLength = 0;
		let textComplexity = 0;
		
		let mapObj = {};
		map.forEach((value, key) => {
			let keyLen = key.replace(/[-]/g, "").replace(/[0-9]/g, "").length;
			if (keyLen == 0) return;
			
			totalLetters += keyLen * value;
			totalWords += value;
			uniqueWords++;
			if (keyLen >= 6) longWords++;
			
			mapObj[key] = value;
		});
		
		rs.totalLetters = totalLetters;
		rs.totalWords = totalWords;
		rs.uniqueWords = uniqueWords;
		rs.longWords = longWords;
		rs.averageWordLength = Math.round(totalLetters / totalWords * 100) / 100;
		rs.numberOfSentences = numberOfSentences;
		rs.textComplexity = Math.round((totalWords / numberOfSentences + (longWords * 100) / totalWords) * 100) / 100;
		//rs.wordOccurrences = mapObj;
		
		fulfill(rs);
	});
}