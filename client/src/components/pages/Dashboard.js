import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EXPENSE } from '../../utils/mutations';
import { ADD_INCOME } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries';



function AddExpense(props) {
    const [userData, setUserData] = useState({});
    // Expense state
    const [expenseState, setExpenseState] = useState({ name: '', cost: '' });
    const [addExpense, { error }] = useMutation(ADD_EXPENSE);
    // Income state
    const [incomeState, setIncomeState] = useState({ name: '', amount: '' });
    const [addIncome, { err }] = useMutation(ADD_INCOME);
    
    const { loading, data} = useQuery(QUERY_ME);
    // Expense data to render
    const expenseList = data?.me.expenses || [];
    const totalExpenses = data?.me.totalExpenses || [];
    // Income data to render
    const incomeList = data?.me.incomes || [];
    const totalIncomes = data?.me.totalIncomes || [];



    

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
        console.log(data);
    },[data])

    ///////////////////////////////////////////////////////////////////
    ////////////// Expense input change and form submit///////////////
    //////////////////////////////////////////////////////////////////
    const handleExpenseChange = (event) => {
        const {name, value} = event.target;
        setExpenseState({...expenseState, [name]: value});
        console.log(expenseState);
    }

    const handleExpenseFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addExpense({
                variables: {
                    userId: userData.me._id,
                    expenseData: {
                        name: expenseState.name,
                        cost: parseFloat(expenseState.cost)
                    }
                }
            });
            console.log(expenseState);
        } catch (err) {
            console.log(err)
        }


        // setExpenseState({
        //     name: '',
        //     cost: '',
        // })
    }


     ////////////////////////////////////////////////////////////////////
     ////////////// Income input change and form submit/////////////////
     //////////////////////////////////////////////////////////////////

     const handleIncomeChange = (event) => {
        const { name, value} = event.target;
        setIncomeState({...incomeState, [name]: value});
        console.log(incomeState)
    }

    const handleIncomeFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addIncome({
                variables: {
                    userId: userData.me._id,
                    incomeData: {
                        name: incomeState.name,
                        amount: parseFloat(incomeState.amount)
                    }
                }
            });
            console.log(incomeState)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <div className='dash-header-container'>
                <h1 className='dash-header'>This will be the dashboard page</h1>
                <p>This will have lots of functionality!</p>
            </div>
            {/* EXPENSE FORM CONTAINER */}
            <div className='dashboard-container'>
                <form onSubmit={handleExpenseFormSubmit}>
                    <div>
                        <p> add an expense</p>
                    </div>
                    <div>
                    <label htmlFor="name"></label>
                        <input
                            onChange={handleExpenseChange}
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="name"
                        >
                        </input>
                    </div>
                    <div>
                    <label htmlFor="cost"></label>
                        <input 
                            onChange={handleExpenseChange}
                            type="text" 
                            id="cost" 
                            name="cost" 
                            placeholder="cost"
                        >
                        </input>
                    </div>
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
                {expenseList.map((expense) => {
                    return (
                        <ul>
                            <li>
                            {expense.name}
                            </li>
                            <li>
                                {expense.cost}
                            </li>
                        </ul>
                    )
                })}
                <div>
                    <p>Total Expenses: {totalExpenses} </p>
                    
                </div>
            </div>
            {/* INCOME FORM CONTAINER */}
            <div className='dashboard-container'>
                <form onSubmit={handleIncomeFormSubmit}>
                    <div>
                        <p> add your income</p>
                    </div>
                    <div>
                    <label htmlFor="name"></label>
                        <input
                            onChange={handleIncomeChange}
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="name"
                        >
                        </input>
                    </div>
                    <div>
                    <label htmlFor="amount"></label>
                        <input 
                            onChange={handleIncomeChange}
                            type="text" 
                            id="amount" 
                            name="amount" 
                            placeholder="amount"
                        >
                        </input>
                    </div>
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
                {incomeList.map((income) => {
                    return (
                        <ul>
                            <li>
                            {income.name}
                            </li>
                            <li>
                                {income.amount}
                            </li>
                        </ul>
                    )
                })}
                <div>
                    <p>Your total income:  {totalIncomes} </p>
                </div>
            </div>
            <div>
                <p> Disposable income : {totalIncomes - totalExpenses} </p>
            </div>
        </div>
    )
}

export default AddExpense;