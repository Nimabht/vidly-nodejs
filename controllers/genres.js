const { AppError } = require("../utils/appError");
const { Genre, validateGenre } = require("../db/models/genre");

module.exports = {
  getGenres: async (req, res, next) => {
    throw new Error("bashe");
    const genres = await Genre.find().sort("name");
    res.send(genres);
  },
  getGenreById: async (req, res, next) => {
    res.send(req.genre);
  },
  createGenre: async (req, res, next) => {
    const { error } = validateGenre(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const genre = new Genre({
      name: req.body.name,
    });
    await genre.save();
    res.status(201).send(genre);
  },
  updateGenre: async (req, res, next) => {
    const { error } = validateGenre(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const genre = req.genre;
    genre.set({
      name: req.body.name,
    });
    const result = await genre.save();
    res.send(result);
  },
  deleteGenre: async (req, res, next) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      const ex = new AppError("Genre not found", "fail", 404);
      return next(ex);
    }
    res.send(genre);
  },
};
