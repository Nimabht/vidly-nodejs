const startUpDebugger = require("debug")("app:startup");
const dbDebagger = require("debug")("app:db");
const express = require("express");
const db = require("./db/connection");
const genres = require("./routes/genres");
const users = require("./routes/users");
const home = require("./routes/home");
const morgan = require("morgan");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/users", users);
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
