const express = require('express');
const router = express.Router();
const {hashPassword} = require('../model/auth');
const userHandlers = require('../model/userHandlers');

router.get("/", userHandlers.getUsers);
router.get("/:id", userHandlers.getUserById);
router.post("/", hashPassword, userHandlers.createUser);
router.put("/:id", hashPassword, userHandlers.updateUser);

module.exports = router;