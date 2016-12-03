const express = require("express");
let app = express();
let configRoutes = require("./routes");

configRoutes(app);

app.listen(3000, () => {
	console.log("We've got a new server");
	console.log("Your routes will be running on http://localhost:3000");
})