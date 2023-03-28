const auth = require("../middleware/auth");
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
router.post("/", auth, createCustomer);
router.put("/:id", auth, getCustomer, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
