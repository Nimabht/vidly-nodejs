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
router.post("/", createGenre);
router.put("/:id", getGenre, updateGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
