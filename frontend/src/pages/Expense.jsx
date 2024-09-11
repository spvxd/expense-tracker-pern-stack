import React, {useEffect, useState} from 'react';
import { useGlobalContext } from '../context/context.jsx';
import {createNewExpense, deleteExpense, deleteIncomes, getAllExpenses, getAllIncomes} from '../api/api.js'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faGlobe,
    faPiggyBank,
    faCode,
    faTrashAlt,
    faBriefcase,
    faBook,
    faMusic,
    faFilm,
    faCamera,
    faPaintBrush,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../components/Sidebar.jsx";

const IncomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const TotalIncome = styled.div`
  font-size: 24px;
  color: #00a300;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const IncomeForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 400px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const AddIncomeButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ff4757;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e84357;
  }
`;

const IncomeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 2;
  max-width: calc(100% - 400px);
  max-height: 600px; /* Fixed height for scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 10px; /* To ensure scrollbar does not overlay the list */

  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd; /* Scrollbar thumb color */
    border-radius: 4px; /* Rounded scrollbar thumb */
  }
`;

const IncomeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const IncomeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 50%;
`;

const IncomeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const IncomeTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
`;


const IncomeDescription = styled.p`
  font-size: 17px;
  color: #666;
  margin-top: 0;
  margin-bottom: 5px;
`;

const IncomeAmount = styled.div`
  font-size: 18px;
  color: #333;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #ff4757;
  cursor: pointer;

  &:hover {
    color: #e84357;
  }
`;

const Expense = () => {
    const {expenses, createNewExpense , getAllExpenses, deleteExpense, totalExpenses} = useGlobalContext()
    const [newExpense, setNewExpense] = useState({
        title: '',
        amount: '',
        date: '',
        category: 'Прочие расходы',
        description: ''
    })

    useEffect(() => {
        getAllExpenses()
    }, []);

    return (
        <>
            <Sidebar></Sidebar>
            <IncomePageContainer>
                <Header>
                    <Title>Expenses</Title>
                    <TotalIncome>Total Expense: {totalExpenses()}</TotalIncome>
                </Header>
                <ContentContainer>
                    <IncomeForm>
                        <FormField>
                            <Label>Expense Title</Label>
                            <Input type="text" placeholder="Salary Title"
                                   onChange={e => setNewExpense({...newExpense, title: e.target.value})}/>
                        </FormField>
                        <FormField>
                            <Label>Expense Amount</Label>
                            <Input type="number" placeholder="Salary Amount"
                                   onChange={e => setNewExpense({...newExpense, amount: e.target.value})}/>
                        </FormField>
                        <FormField>
                            <Label>Enter A Date</Label>
                            <Input type="date" onChange={e => setNewExpense({...newExpense, date: e.target.value})}/>
                        </FormField>
                        <FormField>
                            <Label>Select Option</Label>
                            <Select onChange={e => setNewExpense({...newExpense, option: e.target.value})}>
                                <option value="" selected disabled hidden>Выберите категорию</option>
                                <option value="Зарплата" >Зарплата</option>
                                <option value="Подарки">Подарки</option>
                                <option value="Фриланс">Фриланс</option>
                                <option value="Прочие расходы">Прочие расходы</option>
                            </Select>
                        </FormField>
                        <FormField>
                            <Label>Add A Reference</Label>
                            <Input type="text" placeholder="Add A Reference"
                                   onChange={e => setNewExpense({...newExpense, description: e.target.value})}/>
                        </FormField>
                        <AddIncomeButton onClick={() => createNewExpense(newExpense)}>+ Add Expense</AddIncomeButton>
                    </IncomeForm>

                    <IncomeList>
                        {expenses.map((item) => (
                            <IncomeItem key={item.id}>
                                <IncomeInfo>
                                    <IconWrapper>
                                        <FontAwesomeIcon icon={faGlobe} color="#007bff"/>
                                    </IconWrapper>
                                    <IncomeDetails>
                                        <IncomeTitle>Название: {item.title}</IncomeTitle>
                                        <IncomeDescription>Категория: {item.category}</IncomeDescription>
                                        <IncomeDescription>
                                            Потрачено: {item.amount} руб. • Дата: {item.date} • Описание: {item.description}
                                        </IncomeDescription>
                                    </IncomeDetails>
                                </IncomeInfo>
                                <DeleteButton>
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteExpense(item.id)}/>
                                </DeleteButton>
                            </IncomeItem>
                        ))}
                    </IncomeList>

                </ContentContainer>
            </IncomePageContainer>
        </>
    );
};

export default Expense;
