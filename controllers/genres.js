const { AppError } = require("../utils/appError");
const { Genre, validateGenre } = require("../db/models/genre");

module.exports = {
  getGenres: async (req, res, next) => {
    try {
      const genres = await Genre.find().sort("name");
      res.send(genres);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  getGenreById: async (req, res, next) => {
    try {
      res.send(req.genre);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  createGenre: async (req, res, next) => {
    try {
      const { error } = validateGenre(req.body);
      if (!!error) {
        const ex = new AppError(
          error.details[0].message,
          "fail",
          404
        );
        return next(ex);
      }
      const genre = new Genre({
        name: req.body.name,
      });
      await genre.save();
      res.status(201).send(genre);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  updateGenre: async (req, res) => {
    const { error } = validateGenre(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 404);
      return next(ex);
    }
    const genre = req.genre;
    genre.set({
      name: req.body.name,
    });
    const result = await genre.save();
    res.send(result);
    try {
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  deleteGenre: async (req, res) => {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);
      if (!genre) {
        const ex = new AppError("Genre not found", "fail", 404);
        return next(ex);
      }
      res.send(genre);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
};
