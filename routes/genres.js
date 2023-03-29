const asyncMiddleware = require("../middleware/async");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const getGenre = require("../middleware/getGenre");
const {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");

router.get("/", asyncMiddleware(getGenres));
router.get("/:id", getGenre, asyncMiddleware(getGenreById));
router.post("/", auth, asyncMiddleware(createGenre));
router.put("/:id", auth, getGenre, asyncMiddleware(updateGenre));
router.delete("/:id", [auth, admin], asyncMiddleware(deleteGenre));

module.exports = router;
