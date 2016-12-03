function sumOfSquares(x, y, z){
	if (typeof(x) !== "number" | x === undefined | typeof(y) !== "number" | y === undefined | typeof(z) !== "number" | z === undefined){
		throw "Errors";
	}
	return x * x + y * y + z * z;
}

console.log(sumOfSquares(5, 3, 10));
console.log(" ");

function sayHelloTo(firstName = null, lastName = null, title = null){
	if (firstName == null && lastName == null && title == null){
		console.log("throws");
	}
	
	else {
		if (lastName == null && title == null){
			if (typeof(firstName) !== "string" || firstName === undefined){
				throw "Errors";
			}
			console.log(`Hello, ${firstName}!`);
		}
	
	    else if (title == null){
			if (typeof(firstName) !== "string" || firstName === undefined || typeof(lastName) !== "string" || lastName === undefined){
				throw "Errors";
			}
			console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
		}
	
		else {
			if (typeof(firstName) !== "string" || firstName === undefined || typeof(lastName) !== "string" || lastName === undefined || typeof(title) !== "string" || title === undefined){
				throw "Errors"
			}
			console.log(`Hello, ${title} ${firstName} ${lastName}. Have a good evening!`);
		}
	}
}

sayHelloTo();
sayHelloTo("Phil");
sayHelloTo("Phil", "Barresi");
sayHelloTo("Phil", "Barresi", "Mr.");
console.log(" ");

function cupsOfCoffee(num){
	if (num <= 0) {
		throw "num should be larger than 0";
	}
	if (typeof(num) !== "number" | num === undefined){
		throw "Errors";
	}
	for (var i = num; i > 1; i--){
		console.log(i + " " + "cups of coffee on the desk! " + i + " " + "cups of coffee!"); 
		console.log("Pick one up, drink the cup, " + (i - 1) + " " + "cups of coffee on the desk!");
		console.log(" ");
	}
	if (i == 1){
		console.log(i + " " + "cups of coffee on the desk! " + i + " " + "cups of coffee!");
		console.log("Pick it up, drink the cup, no more coffee left on the desk!");
	}
}

cupsOfCoffee(5);
console.log(" ");

function occurencesOfSubstring(fullString, subString){
	if (typeof(fullString) !== "string" | fullString === undefined | typeof(subString) !== "string" | subString === undefined){
		throw "Errors";
	}
	var count = 0;
	for (var i = 0; i < fullString.length; i++){
		if (fullString.substring(i, i + subString.length) == subString)
			count++;
	}
	console.log(count);
}

occurencesOfSubstring("hello world", "o");
occurencesOfSubstring("Helllllllo, class!", "ll");
console.log(" ");

function randomizeSentences(paragraph){
	if (typeof(paragraph) !== "string" | paragraph === undefined){
		throw "Error";
	}
	var marks = [".", "!", "?"];
	var sentences = [];
	var start = 0;
	for (var i = 0; i < paragraph.length; i++){
		if (i == paragraph.length - 1){
			sentences.push(paragraph.substring(start, i + 1));
		} else {
			var flag = false;
			for (var j = 0; j < marks.length; j++){
				if (paragraph.substring(i, i + 1) == marks[j]){
					flag = true;
					break;
				}
			}
			if (flag){
				sentences.push(paragraph.substring(start, i + 1));
				start = i + 1;
			}
		}
	}
	if (sentences.length == 1)
		console.log(sentences[0]);
	var num = Math.floor(Math.random() * (sentences.length));
	var rs = "";
	for (var i = 0; i < sentences.length; i++){
		if (i != num)
			rs += sentences[i];
	}
	if (num == 0){
		rs = rs.substring(1, rs.length) + " ";
	}
	console.log(rs += sentences[num]);

}

randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.");