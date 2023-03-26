const { User, validateUser } = require("../db/models/user");
const { AppError } = require("../utils/appError");
const bcrypt = require("bcrypt");
module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find().sort("name");
      res.send(users);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { error } = validateUser(req.body);
      if (!!error) {
        const ex = new AppError(
          error.details[0].message,
          "fail",
          400
        );
        return next(ex);
      }
      let user = await User.findOne({ email: req.body.email });
      if (!!user) {
        const ex = new AppError(
          "User already registered.",
          "fail",
          400
        );
        return next(ex);
      }
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const { _id, name, email } = user;
      res.status(201).send({ _id, name, email });
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  updateUser: async (req, res) => {
    const { error } = validateUser(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const user = req.user;
    user.set({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    res.send(result);
    try {
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        const ex = new AppError("User not found", "fail", 404);
        return next(ex);
      }
      res.send(user);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
};
