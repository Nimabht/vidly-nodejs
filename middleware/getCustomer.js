const { Customer } = require("../db/models/customer");
const { AppError } = require("../utils/appError");

async function getCustomer(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      const ex = new AppError("Customer not found", "fail", 404);
      return next(ex);
    }
    req.customer = customer;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}

module.exports = getCustomer;
