const { AppError } = require("../utils/appError");
const { User, validateUser } = require("../db/models/user");

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
          404
        );
        return next(ex);
      }
      const user = new User({
        name: req.body.name,
        phone: +req.body.phone || null,
        isGold: req.body.isGold,
      });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  updateUser: async (req, res) => {
    const { error } = validateUser(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 404);
      return next(ex);
    }
    const user = req.user;
    user.set({
      name: req.body.name,
      phone: +req.body.phone,
      isGold: req.body.isGold,
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
