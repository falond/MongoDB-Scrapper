// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


// Requiring our Note and Article models
var db = require("./models");

//Scraping tools
var request = require("request");
//honeynut cheeriosssss
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapper", {
  useMongoClient: true
});

var db = mongoose.connection;
 
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//****************************************************
// //request, not sure if this is needed
// request('http://www.theonion.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
//****************************************************
//Handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

app.get("/", function(req, res) {
  res.render("index");
});




// This will get the articles scraped and saved in db and show them in list.
app.get("/savedarticles", function(req, res) {

  // Grab every doc in the Articles array
  db.Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      var hbsArticleObject = {
        articles: doc
      };

      res.render("savedarticles", hbsArticleObject);
    }
  });
});

// A GET request to scrape the echojs website
app.post("/scrape", function(req, res) {

  // First, we grab the body of the html with request
  request("https://entertainment.theonion.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);

    // Make emptry array for temporarily saving and showing scraped Articles.
    var scrapedArticles = {};
    // Now, we grab every h2 within an article tag, and do the following:
    $("article h1").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();

      console.log("What's the result title? " + result.title);
      
      result.link = $(this).children("a").attr("href");

      result.img = $(this).children("a").attr("img");

      scrapedArticles[i] = result;

    });

    console.log("Scraped Articles object built nicely: " + scrapedArticles);

    var hbsArticleObject = {
        articles: scrapedArticles
    };

    res.render("index", hbsArticleObject);

  });
});



// app.use('/static', express.static('public'));
var PORT = process.env.PORT || 3000;
//PORT
// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
