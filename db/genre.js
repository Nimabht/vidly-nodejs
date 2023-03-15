const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
});

module.exports = mongoose.model("Genre", genreSchema);
