"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
const noteRoute = require("./noteRoute");

const constructorMethod = (app) => {
    app.use("/note", noteRoute);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;