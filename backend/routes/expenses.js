const router = require('express').Router();
const expenseController = require('../controllers/expenseController')
router.get('/get-expenses', expenseController.getAllExpenses)
router.post('/add-expense', expenseController.createNewExpense )
router.delete('/delete-expense/:id', expenseController.deleteExpense)
router.get('/allTransactions', expenseController.getAllTransactions)

module.exports = router;