const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/userProfile', auth.authenticate, userController.getProfile);
router.patch('/userProfile', auth.authenticate, userController.updateProfile);

router.post("/completeProfile", auth.authenticate, userController.completeProfile);
router.post("/2fa/setup", auth.authenticate, userController.setup2FA);
router.post("/2fa/verify", auth.authenticate, userController.verify2FA);

module.exports = router;