const { Genre } = require("../db/models/genre");
const { AppError } = require("../utils/appError");

async function getGenre(req, res, next) {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      const ex = new AppError("Genre not found", "fail", 404);
      return next(ex);
    }
    req.genre = genre;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}

module.exports = getGenre;
