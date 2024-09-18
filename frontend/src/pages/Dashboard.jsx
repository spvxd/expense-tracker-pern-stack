// src/components/Dashboard.js

import React, {useEffect} from "react";
import styled from "styled-components";
import TransactionCard from "../components/TransactionCard";
import Sidebar from "../components/Sidebar.jsx";
import {useGlobalContext} from "../context/context.jsx";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from 'chart.js'
import {Line, Doughnut} from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
)

// Стиль для контейнера Dashboard
const DashboardContainer = styled.div`
    display: flex;
    justify-content: space-between; /* Распределяем элементы по сторонам */
    padding: 20px;
    background-color: #f8f9fa;
    flex: 1;
`;

// Левая часть, содержащая график и основную информацию
const LeftSection = styled.div`
    display: flex;
    flex-direction: column; /* Размещаем элементы вертикально */
    width: 50%; /* Задаем ширину 50% */
    padding-right: 20px; /* Добавляем отступ справа */
`;

// Правая часть, содержащая историю и другие данные
const RightSection = styled.div`
    display: flex;
    flex-direction: column; /* Размещаем элементы вертикально */
    width: 50%; /* Задаем ширину 50% */
    padding-left: 20px; /* Добавляем отступ слева */
`;

// Стиль для графика
const GraphPlaceholder = styled.div`
    height: 400px;
    background-color: #eaeaea;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #666;
    margin-bottom: 20px; /* Добавляем отступ снизу */
`;

// Стиль для карточек статистики
const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// Стиль для заголовков
const Header = styled.h2`
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
`;

// Стиль для контейнера карточки
const Card = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

// Стиль для заголовка карточки
const CardTitle = styled.h3`
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
`;

// Стиль для значения в карточке
const CardValue = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.color || "#333"};
`;

const Dashboard = () => {
    const {
        incomes,
        expenses,
        getAllIncomes,
        getAllExpenses,
        totalIncomes,
        totalExpenses,
        totalBalance
    } = useGlobalContext()
    useEffect(() => {
        getAllExpenses()
        getAllIncomes()
    }, []);


    const graph = {
        labels: incomes.map((inc) => {
            return inc.date
        }),
        datasets: [{
            label: 'Полученные',
            data: [
                ...incomes.map((inc) => {
                    return inc.amount
                })
            ],
            backgroundColor: 'green',
            tension: .5
        },
            {
                label: 'Потраченные',
                data: [
                    ...expenses.map((exp) => {
                        return exp.amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    const processData = (expenses) => {
        const categoryMap = {};

        expenses.forEach((expense) => {
            if (categoryMap[expense.category]) {
                categoryMap[expense.category] += expense.amount;
            } else {
                categoryMap[expense.category] = expense.amount;
            }
        });

        const labels = Object.keys(categoryMap);
        const data = Object.values(categoryMap);

        return {labels, data};
    };

    const {labels, data} = processData(expenses);
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <Sidebar></Sidebar>
            <DashboardContainer>
                <LeftSection>
                    <GraphPlaceholder>
                        <Line data={graph}/>
                    </GraphPlaceholder>
                    <StatsContainer>
                        <Card>
                            <CardTitle>Total Income</CardTitle>
                            <CardValue color="#28a745">{totalIncomes()} руб.</CardValue>
                        </Card>
                        <Card>
                            <CardTitle>Total Expenses</CardTitle>
                            <CardValue color="#dc3545">{totalExpenses()} руб.</CardValue>
                        </Card>
                        <Card>
                            <CardTitle>Total Balance</CardTitle>
                            <CardValue color="#28a745">{totalBalance()} руб.</CardValue>
                        </Card>
                    </StatsContainer>
                </LeftSection>

                {/* Правая часть с историей и дополнительной информацией */}
                <RightSection>
                    <GraphPlaceholder>
                        <Doughnut data={chartData}/>
                    </GraphPlaceholder>
                    <Card style={{marginTop: "20px"}}>
                        <CardTitle>Salary</CardTitle>
                        <CardValue color="#333">
                            <div>Min: {incomes.length ?
                                Math.min(...incomes.map(item => item.amount)) : 0} руб.
                            </div>
                            <div>Max: {incomes.length ? Math.max(...incomes.map(item => item.amount)) : 0} руб.</div>
                        </CardValue>
                    </Card>
                    <Card style={{marginTop: "20px"}}>
                        <CardTitle>Expense</CardTitle>
                        <CardValue color="#333">
                            <div>Min: {expenses.length ? Math.min(...expenses.map(item => item.amount)) : 0} руб.</div>
                            <div>Max: {expenses.length ? Math.max(...expenses.map(item => item.amount)) : 0} руб.</div>
                        </CardValue>
                    </Card>
                </RightSection>
            </DashboardContainer>
        </>
    );
};

export default Dashboard;
