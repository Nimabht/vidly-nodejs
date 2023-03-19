const { Movie } = require("../db/models/movie");
const { AppError } = require("../utils/appError");

async function getMovie(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      const ex = new AppError("Movie not found", "fail", 404);
      return next(ex);
    }
    req.movie = movie;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}

module.exports = getMovie;
