const { AppError } = require("../utils/appError");

module.exports = function (req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin) {
    const ex = new AppError("Access denied.", "fail", 403);
    return next(ex);
  }
  next();
};
