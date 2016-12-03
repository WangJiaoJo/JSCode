const manipulateRoutes = require("./manipulate");

const constructorMethod = (app) => {
    app.use("/manipulate", manipulateRoutes);
    
    app.use("*", (req, res) => {
        res.redirect("/manipulate/clientform");
    });
};

module.exports = constructorMethod;