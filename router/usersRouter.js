const express = require('express');
const router = express.Router();
const authHandlers = require('../model/auth');
const userHandlers = require('../model/userHandlers');

// Routes publiques
router.get("/", userHandlers.getUsers);
router.get("/:id", userHandlers.getUserById);
router.post("/", authHandlers.hashPassword, userHandlers.createUser);
router.post("/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, authHandlers.verifyPassword);

// Mur d'authentification toutes les fonctions en dessous utiliserons le middleware
router.use(authHandlers.verifyToken);
router.put("/:id", authHandlers.hashPassword, userHandlers.updateUser);
router.delete("/:id", userHandlers.deleteUser);

module.exports = router;