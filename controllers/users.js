const { User, validateUser } = require("../db/models/user");
const { AppError } = require("../utils/appError");
const bcrypt = require("bcrypt");
module.exports = {
  getUsers: async (req, res, next) => {
    const users = await User.find().sort("name");
    res.send(users);
  },
  getUserById: async (req, res, next) => {
    res.send(req.user);
  },
  createUser: async (req, res, next) => {
    const { error } = validateUser(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
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
    const token = user.generateAuthToken();
    const { _id, name, email } = user;
    res
      .status(201)
      .header("x-auth-token", token)
      .send({ _id, name, email });
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
  },
  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const ex = new AppError("User not found", "fail", 404);
      return next(ex);
    }
    res.send(user);
  },
};
