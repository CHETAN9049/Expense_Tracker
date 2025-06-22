const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

router.get('/users', auth.authenticate, roleCheck.requiredRole(['admin']), adminController.listUsers);
router.patch('/users/:id', auth.authenticate, roleCheck.requiredRole(['admin']), adminController.editUser);
router.delete('/users/:id', auth.authenticate, roleCheck.requiredRole(['admin']), adminController.deleteUser);

module.exports = router;