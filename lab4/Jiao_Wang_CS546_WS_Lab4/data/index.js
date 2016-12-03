const classRouters = require("./classes");
const eduRouters = require("./education");
const hobbyRouters = require("./hobbies");
/*
let constructorMethod = (app) = {
	app.use("/classes", classRouters);
	app.use("/education", eduRouters);
	app.use("/hobbies", hobbyRouters);
}
*/
module.exports = {
	classes: classRouters,
	education : eduRouters,
	hobbies: hobbyRouters
}