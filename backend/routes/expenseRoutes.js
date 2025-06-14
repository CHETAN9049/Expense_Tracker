const expenseRouter = require('express').Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

expenseRouter.post('/add', auth.authenticate, expenseController.addExpense);

expenseRouter.get('/:userId', auth.authenticate, expenseController.getExpenses);

expenseRouter.put('/edit/:id', auth.authenticate, expenseController.editExpense);

expenseRouter.delete('/delete/:id', auth.authenticate, expenseController.deleteExpense);

// Admin-only route
expenseRouter.get('/admin/report', auth.authenticate, roleCheck.requiredRole(['admin']), (req, res) => {
    res.send({ message: "This is a protected admin report" });
});

module.exports = expenseRouter;