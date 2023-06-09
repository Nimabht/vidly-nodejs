const { AppError } = require("../utils/appError");
const { Movie, validateMovie } = require("../db/models/movie");
const { Genre } = require("../db/models/genre");

module.exports = {
  getMovies: async (req, res, next) => {
    const movies = await Movie.find().sort("title");
    res.send(movies);
  },
  getMovieById: async (req, res, next) => {
    res.send(req.movie);
  },
  createMovie: async (req, res, next) => {
    const { error } = validateMovie(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      const ex = new AppError("Invalid genre.", "fail", 400);
      return next(ex);
    }
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.status(201).send(movie);
  },
  updateMovie: async (req, res, next) => {
    const { error } = validateMovie(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const movie = req.movie;
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      const ex = new AppError("Invalid genre.", "fail", 400);
      return next(ex);
    }
    movie.title = req.body.title;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.genre._id = genre._id;
    movie.genre.name = genre.name;

    const result = await movie.save();
    res.send(result);
  },
  deleteMovie: async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      const ex = new AppError("Movie not found", "fail", 404);
      return next(ex);
    }
    res.send(movie);
  },
};
