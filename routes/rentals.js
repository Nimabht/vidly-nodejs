const express = require("express");
const {
  getRentals,
  createRental,
} = require("../controllers/rentals");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", getRentals);
router.post("/", auth, createRental);

module.exports = router;
