const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

exports.Genre = mongoose.model("Genre", genreSchema);
exports.validateGenre = validateGenre;
