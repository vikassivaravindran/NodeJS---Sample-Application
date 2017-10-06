var express = require('express');
var home = express.Router();

home.get('/', function(req, res) {
	console.log("home is called");
	res.setHeader('Content-Type', 'application/json');
  res.write("Welcome to APP PES Order API");
});

module.exports = home;
