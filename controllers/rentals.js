const { Rental, validateRental } = require("../db/models/rental");
const { AppError } = require("../utils/appError");
const { User } = require("../db/models/user");
const { Movie } = require("../db/models/movie");

module.exports = {
  getRentals: async (req, res, next) => {
    try {
      const rentals = await Rental.find().sort("-dateOut");
      res.send(rentals);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
  createRental: async (req, res, next) => {
    const { error } = validateRental(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    try {
      const user = await User.findById(req.body.userId);
      if (!user) {
        const ex = new AppError("Invalid user.", "fail", 400);
        return next(ex);
      }
      const movie = await Movie.findById(req.body.movieId);
      if (!movie) {
        const ex = new AppError("Invalid movie.", "fail", 400);
        return next(ex);
      }
      if (movie.numberInStock === 0) {
        const ex = new AppError("Movie not in stock.", "fail", 400);
        return next(ex);
      }
      const rental = new Rental({
        user: {
          _id: user._id,
          name: user.name,
          isGold: user.isGold,
          phone: user.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
      await rental.save();
      await movie.numberInStock--;
      await movie.save();
      res.status(201).send(rental);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  },
};
