// Dependencies
var express = require("express");
// Set Handlebars
var exphbs = require("express-handlebars");
//mongo db
var mongojs = require("mongojs");
//body parser
var bodyParser = require("body-parser");
//request
var request = require("request");
//honeynut cheeriosssss
var cheerio = require("cheerio");
//Method override 
var methodOverride = require("method-override");

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
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//****************************************************
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//****************************************************


db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.use('/static', express.static('public'));
var PORT = process.env.PORT || 3000;
//PORT
// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
