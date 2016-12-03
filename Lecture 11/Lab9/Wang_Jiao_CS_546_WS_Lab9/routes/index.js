const pagesRoutes = require("./pages");
const noteData = require("../data");

const constructorMethod = (app) => {
    app.use("/pages", pagesRoutes);

    app.get("/", function (request, response) {
        response.render("home");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;