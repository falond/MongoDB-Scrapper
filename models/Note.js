var mongoose = require("mongoose");


// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
  body: {
    type: String
  }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model


// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;