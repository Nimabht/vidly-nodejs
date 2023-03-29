const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const getGenre = require("../middleware/getGenre");
const {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");

router.get("/", getGenres);
router.get("/:id", getGenre, getGenreById);
router.post("/", auth, createGenre);
router.put("/:id", auth, getGenre, updateGenre);
router.delete("/:id", [auth, admin], deleteGenre);

module.exports = router;
