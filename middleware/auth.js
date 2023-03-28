const jwt = require("jsonwebtoken");
const config = require("config");
const { AppError } = require("../utils/appError");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied. No token provided.");
  try {
    const decodedPayload = jwt.verify(
      token,
      config.get("jwtPrivateKey")
    );
    req.user = decodedPayload;
    next();
  } catch (error) {
    const ex = new AppError("Invalid token", "fail", 400);
    return next(ex);
  }
};
