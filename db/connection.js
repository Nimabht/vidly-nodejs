const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/vidly-nodejs")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
