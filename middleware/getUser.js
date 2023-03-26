const { User } = require("../db/models/user");
const { AppError } = require("../utils/appError");

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const ex = new AppError("User not found", "fail", 404);
      return next(ex);
    }
    req.user = user;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}

module.exports = getUser;
