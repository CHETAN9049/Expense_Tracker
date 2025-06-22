const express = require("express");
const { register, login, addTransaction } = require("../controllers/authController");
const { authLimiter } = require('../middlewares/rateLimiter');
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");


router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
