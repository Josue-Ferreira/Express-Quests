const express = require('express');
const router = express.Router();
const movieHandlers = require("../model/movieHandlers");
const authHandlers = require('../model/auth');

// Routes publiques
router.get("/", movieHandlers.getMovies);
router.get("/:id", movieHandlers.getMovieById);

// Mur d'authentification toutes les fonctions en dessous utiliserons le middleware
router.use(authHandlers.verifyToken);
router.post("/", movieHandlers.createMovie);
router.put("/:id", movieHandlers.updateMovie);
router.delete("/:id", movieHandlers.deleteMovie);

module.exports = router;