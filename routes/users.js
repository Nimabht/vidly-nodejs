const express = require("express");
const router = express.Router();
const getUser = require("../middleware/getUser");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUser, getUserById);
router.post("/", createUser);
router.put("/:id", getUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
