const asyncMiddleware = require("../middleware/async");
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

router.get("/", asyncMiddleware(getMovies));
router.get("/:id", getMovie, asyncMiddleware(getMovieById));
router.post("/", auth, asyncMiddleware(createMovie));
router.put("/:id", auth, getMovie, asyncMiddleware(updateMovie));
router.delete("/:id", auth, asyncMiddleware(updateMovie));

module.exports = router;
