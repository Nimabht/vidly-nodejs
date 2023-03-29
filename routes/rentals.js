const asyncMiddleware = require("../middleware/async");
const express = require("express");
const {
  getRentals,
  createRental,
} = require("../controllers/rentals");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", asyncMiddleware(getRentals));
router.post("/", auth, asyncMiddleware(createRental));

module.exports = router;
