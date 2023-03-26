const config = require("config");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/user");
const bcrypt = require("bcrypt");
const { AppError } = require("../utils/appError");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const ex = new AppError(
        "Invalid email or password.",
        "fail",
        400
      );
      return next(ex);
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      const ex = new AppError(
        "Invalid email or password.",
        "fail",
        400
      );
      return next(ex);
    }
    const token = jwt.sign(
      { _id: user._id },
      config.get("jwtPrivateKey")
    );
    res.send(token);
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required(),
  });
  return schema.validate(req);
}
module.exports = router;
