module.exports = (Error, req, res, next) => {
  if (
    !Error.statusCode ||
    Error.statusCode.toString().startsWith("5")
  )
    console.log(Error);
  res.status(Error.statusCode || 500);
  res.send({
    error: Error.status || "error",
    message: Error.statusCode.toString().startsWith("5")
      ? "Internal Server Error"
      : Error.message,
  });
};
