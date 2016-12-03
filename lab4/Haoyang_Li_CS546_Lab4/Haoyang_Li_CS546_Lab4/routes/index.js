const educationRoutes = require("./education");
const hobbiesRoutes = require("./hobbies");
const classesRoutes = require("./classes");

const constructorMethod = (app) => {
    app.use("/education", educationRoutes);
    app.use("/hobbies", hobbiesRoutes);
    app.use("/classes", classesRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Unvalie Symbol Not Found"});
    });
};

module.exports = constructorMethod;

