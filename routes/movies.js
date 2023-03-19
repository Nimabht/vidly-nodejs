const express = require("express");
const getMovie = require("../middleware/getMovie");
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie, getMovieById);
router.post("/", createMovie);
router.put("/:id", getMovie, updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
