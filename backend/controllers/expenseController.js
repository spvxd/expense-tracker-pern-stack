const {Expense, Income} = require('../models/models')

class ExpenseController {
    async createNewExpense(req, res) {
        console.log(req.body)
        const {
            title, amount, type, date, category,
            description
        } = req.body
        try {
            const query = await Expense.create({title, amount, type, date, category, description})
            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.status(500).json({Error: err})
        }
    }

    async getAllExpenses(req, res) {
        try {
            const allIncomes = (await Expense.findAll({raw: true, order: [['date', 'DESC']]}))
            return res.status(200).json(allIncomes)
        } catch (err) {
            console.log(err)
            return res.status(500).json({Error: err})
        }

    }

    async deleteExpense(req, res) {
        try{
            const {id} = req.params
            const query = await Expense.destroy({where: {id: id}})
            return res.sendStatus(200)
        }
        catch (err){
            return res.status(500).json({Error: err})
        }
    }

    async getAllTransactions(req,res) {
        const [incomes, expenses] = await Promise.all([
            Income.findAll({
                order: [['date', 'ASC']], raw: true
            }, ),
            Expense.findAll({
                order: [['date', 'ASC']],  raw: true
            }),
        ]);

        const allData = [...incomes, ...expenses];

        allData.sort((a, b) => new Date(b.date) - new Date(a.date));

        return res.json(allData)
    }
}

module.exports = new ExpenseController();