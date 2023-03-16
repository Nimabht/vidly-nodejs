class AppError extends Error {
  constructor(message, status, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.statusCode = statusCode;
  }
}
module.exports = { AppError };
