// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Requiring our Note and Article models
var index = require("./models/index.js");

//Scraping tools
var request = require("request");
//honeynut cheeriosssss
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;



//****************************************************
//request, not sure if this is needed
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
//****************************************************
//Handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//****************************************************
// Initialize Express
var app = express();
//****************************************************
// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
//****************************************************
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//****************************************************

// Serve static content
app.use(express.static("public"));





app.use('/static', express.static('public'));
var PORT = process.env.PORT || 3000;
//PORT
// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
