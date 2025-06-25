const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/userProfile', auth.authenticate, userController.getProfile);
router.patch('/userProfile', auth.authenticate, userController.updateProfile);
router.post("/completeProfile", auth.authenticate, userController.completeProfile);

module.exports = router;