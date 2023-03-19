const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: undefined },
  isGold: { type: Boolean, default: false },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.String(),
    isGold: Joi.boolean(),
  });
  return schema.validate(user);
}

exports.User = mongoose.model("User", userSchema);
exports.validateUser = validateUser;
