// const express = require('express')
// const app = express()
// const port = process.env.APP_PORT || process.env.PORT || process.env.VCAP_APP_PORT || 3000;

// app.set("views", __dirname + "/client")

// app.use(express.static(__dirname + "/client"))

// app.get('/', (req, res) => {
// 	res.status(200).render(express.static())
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

(function () {
	"use strict";

	const appPort = process.env.APP_PORT || process.env.PORT || 3000;
	const express = require("express");
	const app = express();

	let server = require("http").createServer(app)

	app.set("views", __dirname + "/client");
	app.use(express.static(__dirname + "/client"));
	app.use(express.json());
	app.use(express.urlencoded({
		"extended": true,
		"limit": "10mb"
	}));

	server.listen(appPort, function () {
		process.stdout.write(`\nServer running on port: ${appPort}\n`);
		require("./server/routes/index")(app);
	});

}());