const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: undefined },
  isGold: { type: Boolean, default: false },
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.String(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

exports.Customer = mongoose.model("Customer", customerSchema);
exports.validateCustomer = validateCustomer;
