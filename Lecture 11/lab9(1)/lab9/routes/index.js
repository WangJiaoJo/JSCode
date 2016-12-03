const allRoutes = require("./all");
const newRoutes = require("./new");
const singleRoutes = require("./single");
// const noteData = require('../data');

const constructorMethod = (app) => {
    app.use("/new", newRoutes);

    app.use("/all", allRoutes);

    app.use("/single", singleRoutes);

    app.get("/", function (request, response) {
        response.render("home");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;