const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TodoCollection", TodoSchema);
//The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.
// here TodoCollection -> todoCollections
