const router = require('express').Router();
const incomeController = require('../controllers/incomeController')
router.get('/get-incomes', incomeController.getAllIncomes)
router.post('/add-income', incomeController.createNewIncome)
router.delete('/delete-income/:id', incomeController.deleteIncome)

module.exports = router;