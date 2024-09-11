const express = require('express')
const app = express()
const sequelize = require('./db/db')
const  bodyParser = require('body-parser')
app.use(express.json())
const cors = require('cors')
require('dotenv').config()
const incomeRouter = require('./routes/incomes')
const expenseRouter = require('./routes/expenses')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const corsOptions ={
    origin: '*',
}
app.use(cors(corsOptions))
app.use('/incomes', incomeRouter)
app.use('/expenses', expenseRouter)

app.get('/', (req, res) => {
    return res.sendStatus(200)
})
const startApp = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    }
    catch (err){
        console.log(err)
    }
}

startApp().then(()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})