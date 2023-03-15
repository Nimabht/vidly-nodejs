const startUpDebugger = require("debug")("app:startup");
const dbDebagger = require("debug")("app:db");
const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const Joi = require("joi");
const morgan = require("morgan");
const { logger } = require("./middleware/logger");
const { auth } = require("./middleware/auth");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(logger);
app.use(auth);
app.use("/api/genres", genres);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan enabled...");
}

dbDebagger("db Debugging...");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
