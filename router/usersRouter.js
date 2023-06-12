const express = require('express');
const router = express.Router();
const userHandlers = require('../model/userHandlers')

router.get("/", userHandlers.getUsers);
router.get("/:id", userHandlers.getUserById);
router.post("/", userHandlers.createUser);
router.put("/:id", userHandlers.updateUser);

module.exports = router;