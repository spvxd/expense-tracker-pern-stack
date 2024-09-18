import React, {useContext, useState} from "react"
import axios from 'axios'


const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [transactions, setTransactions] = useState([])
    const [error, setError] = useState(null)

    const createNewExpense = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/expenses/add-expense', data)
            await getAllExpenses()

        } catch (err) {
            console.log(err)
        }

    }

    const getAllExpenses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/expenses/get-expenses')
            setExpenses(res.data)

        } catch (err) {
            console.log(err)
        }

    }

    const deleteExpense = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/expenses/delete-expense/${id}`)
            await getAllExpenses()

        } catch (err) {
            console.log(err)
        }

    }


    const createNewIncome = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/incomes/add-income', data)
            await getAllIncomes()
        } catch (err) {
            console.log(err)
        }

    }

    const getAllIncomes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/incomes/get-incomes')
            setIncomes(res.data)
        } catch (err) {
            console.log(err)
        }

    }

    const deleteIncomes = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/incomes/delete-income/${id}`)
            await getAllIncomes()
        } catch (err) {
            console.log(err)
        }

    }


    const totalIncomes = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    const totalBalance = () => {
        return totalIncomes() - totalExpenses()
    }
    const allTransactions = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/expenses/allTransactions`)
            setTransactions(res.data)
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <GlobalContext.Provider value={{
            incomes,
            expenses,
            transactions,
            totalIncomes,
            createNewExpense,
            getAllExpenses,
            deleteExpense,
            createNewIncome,
            getAllIncomes,
            deleteIncomes,
            totalExpenses,
            totalBalance,
            allTransactions,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}