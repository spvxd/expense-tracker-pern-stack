const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Income =  sequelize.define('income', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    type: {type: DataTypes.STRING, defaultValue: 'income'},
    date: {type: DataTypes.DATEONLY},
    category: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Expense =  sequelize.define('expense', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    type: {type: DataTypes.STRING, defaultValue: 'expense'},
    date: {type: DataTypes.DATEONLY},
    category: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

module.exports = {Income, Expense}