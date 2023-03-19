const express = require("express");
const {
  getRentals,
  createRentals,
} = require("../controllers/rentals");
const router = express.Router();

router.get("/", getRentals);
router.post("/", createRentals);

module.exports = router;
