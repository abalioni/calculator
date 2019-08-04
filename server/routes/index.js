(function () {
	"use strict";

	module.exports = function (app) {

		app.get("/", (req, res) => res.status(200).render("./client/index.html"));

	};

}());