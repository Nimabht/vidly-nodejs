const auth = require("../middleware/auth");
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
router.post("/", auth, createMovie);
router.put("/:id", auth, getMovie, updateMovie);
router.delete("/:id", auth, deleteMovie);

module.exports = router;
