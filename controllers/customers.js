const { AppError } = require("../utils/appError");
const {
  Customer,
  validateCustomer,
} = require("../db/models/customer");

module.exports = {
  getCustomers: async (req, res, next) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  },
  getCustomerById: async (req, res, next) => {
    res.send(req.customer);
  },
  createCustomer: async (req, res, next) => {
    const { error } = validateCustomer(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const customer = new Customer({
      name: req.body.name,
      phone: +req.body.phone || null,
      isGold: req.body.isGold,
    });
    await customer.save();
    res.status(201).send(customer);
  },
  updateCustomer: async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
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
  },
  deleteCustomer: async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      const ex = new AppError("Customer not found", "fail", 404);
      return next(ex);
    }
    res.send(customer);
  },
};
