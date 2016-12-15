const exampleRoutes = require("./sample");

const constructorMethod = (app) => {
    app.use("/sample", exampleRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;
