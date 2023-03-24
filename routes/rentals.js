const express = require("express");
const {
  getRentals,
  createRental,
} = require("../controllers/rentals");
const router = express.Router();

router.get("/", getRentals);
router.post("/", createRental);

module.exports = router;
