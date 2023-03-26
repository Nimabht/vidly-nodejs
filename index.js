const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const startUpDebugger = require("debug")("app:startup");
const dbDebagger = require("debug")("app:db");
const express = require("express");
const db = require("./db/connection");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const home = require("./routes/home");
const morgan = require("morgan");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan enabled...");
}

dbDebagger("db Debugging...");
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
