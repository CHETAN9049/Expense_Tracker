const express = require("express");
const { register, login} = require("../controllers/authController");
const { authLimiter } = require('../middlewares/rateLimiter');
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const { verify2FAEmailCode } = require("../controllers/authController");

router.post("/verify-2fa-email", verify2FAEmailCode);
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
