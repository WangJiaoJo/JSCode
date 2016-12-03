function test(text){
	var word = text.replace(/[,\[\];:()".?!-']/g, " ")
               .replace(/\s+/g, " ");
	text = text.replace(/[,\[\];:()"]/g, " ").replace(/\s+/g, " ").toLowerCase();
	console.log(word);
	console.log(text);
}

test("Hello World! hello world; hello? world.");

