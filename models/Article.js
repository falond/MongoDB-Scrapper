var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  // todo save summary paragraph instead of link
  link: {
    type: String,
    required: true
  },
  // Saves array of notes.
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});



// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);


// Export the Article model
module.exports = Article;