const {Income} = require('../models/models')
const {all} = require("express/lib/application");

class IncomeController {
    async createNewIncome(req, res) {
        console.log(req.body)
        const {
            title, amount, type, date, category,
            description
        } = req.body
        try {
            const query = await Income.create({title, amount, type, date, category, description})
            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.status(500).json({Error: err})
        }
    }

    async getAllIncomes(req, res) {
        try {
            const allIncomes = await Income.findAll({raw: true, order: [['date', 'DESC']]})
            return res.status(200).json(allIncomes)
        } catch (err) {
            console.log(err)
            return res.status(500).json({Error: err})
        }

    }

    async deleteIncome(req, res) {
        try{
            const {id} = req.params
            const query = await Income.destroy({where: {id: id}})
            return res.sendStatus(200)
        }
        catch (err){
            return res.status(500).json({Error: err})
        }
    }
}

module.exports = new IncomeController();