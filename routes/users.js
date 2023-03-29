const asyncMiddleware = require("../middleware/async");
const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const getUser = require("../middleware/getUser");
const router = express.Router();

// router.get("/", getUsers);
// router.get("/:id", getUser, getUserById);
router.post("/", asyncMiddleware(createUser));
// router.put("/:id", getUser, updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;
