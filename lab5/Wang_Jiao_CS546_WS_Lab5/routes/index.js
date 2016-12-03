const recipeRoutes = require("./recipes");
const commentRoutes = require("./comments");

const constructorMethod = (app) => {
	app.use("/recipes", recipeRoutes);
	app.use("/comments", commentRoutes);
};

module.exports = constructorMethod;