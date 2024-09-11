// src/components/Dashboard.js

import React from "react";
import styled from "styled-components";
import TransactionCard from "../components/TransactionCard";
import Sidebar from "../components/Sidebar.jsx";


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
    height: 250px;
    background-color: #eaeaea;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
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
    return (
        <>
            <Sidebar></Sidebar>
            <DashboardContainer>
                {/* Левая часть с графиком и статистикой */}
                <LeftSection>
                    <GraphPlaceholder>Graph Placeholder</GraphPlaceholder>
                    <StatsContainer>
                        <Card>
                            <CardTitle>Total Income</CardTitle>
                            <CardValue color="#28a745">$15200</CardValue>
                        </Card>
                        <Card>
                            <CardTitle>Total Expenses</CardTitle>
                            <CardValue color="#dc3545">$3920</CardValue>
                        </Card>
                        <Card>
                            <CardTitle>Total Balance</CardTitle>
                            <CardValue color="#28a745">$11280</CardValue>
                        </Card>
                    </StatsContainer>
                </LeftSection>

                {/* Правая часть с историей и дополнительной информацией */}
                <RightSection>
                    <Header>Recent History</Header>
                    <TransactionCard name="Dentist Appointment" amount="-120"/>
                    <TransactionCard name="Travelling" amount="-3000"/>
                    <TransactionCard name="Rent" amount="-800"/>
                    <Card style={{marginTop: "20px"}}>
                        <CardTitle>Salary</CardTitle>
                        <CardValue color="#333">
                            <div>Min: $1200</div>
                            <div>Max: $8000</div>
                        </CardValue>
                    </Card>
                    <Card style={{marginTop: "20px"}}>
                        <CardTitle>Expense</CardTitle>
                        <CardValue color="#333">
                            <div>Min: $120</div>
                            <div>Max: $3000</div>
                        </CardValue>
                    </Card>
                </RightSection>
            </DashboardContainer>
        </>
    );
};

export default Dashboard;
