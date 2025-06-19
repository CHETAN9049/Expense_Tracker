const express = require("express");
const { register, login } = require("../controllers/authController");
const { authLimiter } = require('../middlewares/rateLimiter');
const router = express.Router();
const {setup2FA, verify2FA} = require("../controllers/authController");
const {auth} = require("../middlewares/authMiddleware");

router.post("/2fa/setup", auth.authenticate, setup2FA);
router.post("/2fa/verify", auth.authenticate, verify2FA);    

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
