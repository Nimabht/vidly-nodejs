const auth = (req, res, next) => {
  console.log("Auth...");
  next();
};

module.exports.auth = auth;