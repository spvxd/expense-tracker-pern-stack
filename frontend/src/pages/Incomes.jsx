// src/pages/Incomes.jsx

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import {deleteIncomes, getAllIncomes} from "../api/api.js";

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
  font-size: 16px;
  color: #333;
`;

const IncomeDescription = styled.p`
  font-size: 14px;
  color: #666;
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

const Incomes = () => {
    const [income, setIncome] = useState([])
    const [newIncome, setNewIncome] = useState({
        title: '',
        amount: '',
        date: '',
        option: '',
        description: ''
    })
    useEffect(() => {
        const expenses = getAllIncomes().then(res => {
            setIncome(res)
        })

    }, []);
    const handleDelete = async (id) => {
        await deleteIncomes(id).then(() => {
            getAllIncomes().then(res => {
                setIncome(res)
            })
        })
    }
    const handleSubmit = async () => {
        console.log(newIncome)
    }
    return (
        <>
            <Sidebar></Sidebar>
        <IncomePageContainer>
            <Header>
                <Title>Incomes</Title>
                <TotalIncome>Total Income: $16500</TotalIncome>
            </Header>
            <ContentContainer>
                <IncomeForm>
                    <FormField>
                        <Label>Salary Title</Label>
                        <Input type="text" placeholder="Salary Title"  onChange={e => setNewIncome({...newIncome, title: e.target.value})} />
                    </FormField>
                    <FormField>
                        <Label>Salary Amount</Label>
                        <Input type="number" placeholder="Salary Amount"  onChange={e => setNewIncome({...newIncome, amount: e.target.value})} />
                    </FormField>
                    <FormField>
                        <Label>Enter A Date</Label>
                        <Input type="date"  onChange={e => setNewIncome({...newIncome, date: e.target.value})} />
                    </FormField>
                    <FormField>
                        <Label>Select Option</Label>
                        <Select  onChange={e => setNewIncome({...newIncome, option: e.target.value})}>
                            <option value="">Select Option</option>
                            <option value="freelance">Freelance</option>
                            <option value="shopify">Shopify</option>
                            <option value="youtube">YouTube Adsense</option>
                            <option value="developer">Developer Salary</option>
                        </Select>
                    </FormField>
                    <FormField>
                        <Label>Add A Reference</Label>
                        <Input type="text" placeholder="Add A Reference"  onChange={e => setNewIncome({...newIncome, description: e.target.value})} />
                    </FormField>
                    <AddIncomeButton onClick={handleSubmit}>+ Add Income</AddIncomeButton>
                </IncomeForm>
                <IncomeList>
                    {income.map((item) => (
                        <IncomeItem key={item.id}>
                            <IncomeInfo>
                                <IconWrapper>
                                    <FontAwesomeIcon icon={faGlobe} color="#007bff" />
                                </IconWrapper>
                                <IncomeDetails>
                                    <IncomeTitle>{item.title}</IncomeTitle>
                                    <IncomeDescription>
                                        ${item.amount} • {item.date} • {item.description}
                                    </IncomeDescription>
                                </IncomeDetails>
                            </IncomeInfo>
                            <DeleteButton>
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(item.id)} />
                            </DeleteButton>
                        </IncomeItem>
                    ))}
                </IncomeList>
            </ContentContainer>
        </IncomePageContainer>
</>
    );
};

export default Incomes;
