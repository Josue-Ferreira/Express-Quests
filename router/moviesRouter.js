const express = require('express');
const router = express.Router();
const movieHandlers = require("../model/movieHandlers");

router.get("/", movieHandlers.getMovies);
router.get("/:id", movieHandlers.getMovieById);
router.post("/", movieHandlers.createMovie);
router.put("/:id", movieHandlers.updateMovie);

module.exports = router;