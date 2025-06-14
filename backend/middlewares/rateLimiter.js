const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 mins window
    max: 5, // limit to 5 requests per window of duration
    message: {
        success: false,
        message: 'Too many attempts, please try again after sometime.'
    },
    standardHeaders: true,
    legacyHeaders: false
});



module.exports = { authLimiter }