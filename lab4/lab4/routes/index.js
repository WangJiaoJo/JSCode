const classRoutes = require("./classes");
const eduRoutes = require("./education");
const hobbyRoutes = require("./hobbies");

const constructorMethod = (app) => {
	app.use("/classes", classRoutes);
	app.use("/education", eduRoutes);
	app.use("/hobbies", hobbyRoutes);
	
	app.use("*", (req, res) => {
		res.sendStatus(400).json({error: "Unvail Symbol Not Found"});
	});
};

module.exports = constructorMethod;