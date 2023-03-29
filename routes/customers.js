const asyncMiddleware = require("../middleware/async");
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

router.get("/", asyncMiddleware(getCustomers));
router.get("/:id", getCustomer, asyncMiddleware(getCustomerById));
router.post("/", auth, asyncMiddleware(createCustomer));
router.put(
  "/:id",
  auth,
  getCustomer,
  asyncMiddleware(updateCustomer)
);
router.delete("/:id", auth, asyncMiddleware(deleteCustomer));

module.exports = router;
