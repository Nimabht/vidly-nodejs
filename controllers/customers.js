const { AppError } = require("../utils/appError");
const {
  Customer,
  validateCustomer,
} = require("../db/models/customer");

module.exports = {
  getCustomers: async (req, res, next) => {
    try {
      const customers = await Customer.find().sort("name");
      res.send(customers);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  getCustomerById: async (req, res, next) => {
    try {
      res.send(req.customer);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  createCustomer: async (req, res, next) => {
    try {
      const { error } = validateCustomer(req.body);
      if (!!error) {
        const ex = new AppError(
          error.details[0].message,
          "fail",
          404
        );
        return next(ex);
      }
      const customer = new Customer({
        name: req.body.name,
        phone: +req.body.phone || null,
        isGold: req.body.isGold,
      });
      await customer.save();
      res.status(201).send(customer);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  updateCustomer: async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 404);
      return next(ex);
    }
    const customer = req.customer;
    customer.set({
      name: req.body.name,
      phone: +req.body.phone,
      isGold: req.body.isGold,
    });
    const result = await customer.save();
    res.send(result);
    try {
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(
        req.params.id
      );
      if (!customer) {
        const ex = new AppError("Customer not found", "fail", 404);
        return next(ex);
      }
      res.send(customer);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
};
