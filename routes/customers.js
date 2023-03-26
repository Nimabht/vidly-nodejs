const express = require("express");
const router = express.Router();
const getCustomer = require("../middleware/getCustomer");
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

router.get("/", getCustomers);
router.get("/:id", getCustomer, getCustomerById);
router.post("/", createCustomer);
router.put("/:id", getCustomer, updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
