const Joi = require("Joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    minlength: 4,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    match:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required(),
  });
  return schema.validate(user);
}

exports.User = mongoose.model("User", userSchema);
exports.validateUser = validateUser;
