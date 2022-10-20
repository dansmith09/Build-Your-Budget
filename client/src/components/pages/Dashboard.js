import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EXPENSE, ADD_INCOME, REMOVE_EXPENSE, REMOVE_INCOME } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import DoughnutChart from '../../charts/DoughnutChart'
import BarChart from '../../charts/BarChart'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import LineChart from '../../charts/LineChart';

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
    // Remove Income
    const [removeExpense, { deletExpenseError }] = useMutation(REMOVE_EXPENSE)
    const [removeIncome, { deletIncomeError }] = useMutation(REMOVE_INCOME)

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    },[data])

    ///////////////////////////////////////////////////////////////////
    ////////////// Expense input change and form submit///////////////
    //////////////////////////////////////////////////////////////////
    const handleExpenseChange = (event) => {
        const {name, value} = event.target;
        setExpenseState({...expenseState, [name]: value});
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
            
        } catch (err) {
            console.log(err)
        }

        setExpenseState({
            name: '',
            cost: '',
        })
    }


     ////////////////////////////////////////////////////////////////////
     ////////////// Income input change and form submit/////////////////
     //////////////////////////////////////////////////////////////////

     const handleIncomeChange = (event) => {
        const { name, value} = event.target;
        setIncomeState({...incomeState, [name]: value});
        
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
        } catch (err) {
            console.log(err)
        }

        setIncomeState({
            name: '',
            amount: '',
        })
    }

     const handleRemoveExpense = async (expenseId) => {
        console.log(expenseId)
        try {
          const { data } = await removeExpense({
            variables: {
                expenseId: expenseId 
            },
          });
          console.log(data)
        } catch (err) {
          console.error(err);
        }
      };

      const handleRemoveIncome = async (incomeId) => {
         console.log(incomeId)
         try {
           const { data } = await removeIncome({
             variables: {
                 incomeId: incomeId 
             },
           });
           console.log(data)
         } catch (err) {
           console.error(err);
         }
       };


    return (
        <div>
            <div className='dash-header-container'>
                <h1 className='dash-header'>Expense Planner</h1>
            </div>
            <section className='dash-form-container'>
            <div className='dashboard-container'>
                    <form onSubmit={handleIncomeFormSubmit}>
                        <div>
                            <p className='form-head'> Add an Income</p>
                        </div>
                        <div>
                        <label htmlFor="name"></label>
                            <input
                                className='form-input'
                                onChange={handleIncomeChange}
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="income"
                                value={incomeState.name}
                            >
                            </input>
                        </div>
                        <div>
                        <label htmlFor="amount"></label>
                            <input
                                className='form-input'
                                onChange={handleIncomeChange}
                                type="text" 
                                id="amount" 
                                name="amount" 
                                placeholder="amount"
                                value={incomeState.amount}
                            >
                            </input>
                        </div>
                    <button className='input-button' type="submit">add</button>
                </form>
            </div>
                <div className='dashboard-container'>
                    <form onSubmit={handleExpenseFormSubmit}>
                        <div className='form-head'>
                            <p> Add an Expense</p>
                        </div>
                        <div>
                        <label htmlFor="name"></label>
                            <input
                                className='form-input'
                                onChange={handleExpenseChange}
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="expense"
                                value={expenseState.name}
                            >
                            </input>
                        </div>
                        <div>
                        <label htmlFor="cost"></label>
                            <input 
                                className='form-input'
                                onChange={handleExpenseChange}
                                type="text" 
                                id="cost" 
                                name="cost" 
                                placeholder="cost"
                                value={expenseState.cost}
                            >
                            </input>
                        </div>
                        <button className='input-button' type="submit">add</button>
                    </form>
                </div>
            </section>
            <section>
                <div className='dashboard-cards'>
                <div className='dashboard-card'>
                    <h2 className='dashboard-card-header'> Income </h2>
                    <br></br>
                    {incomeList.map((income) => {
                            return (
                                <div
                                key={`${income._id}`}
                                className='dashboard-card-content'>
                                <CiEdit
                                    className='dashButton'
                                    // onClick={() => handleEditincome(income._id)}
                                />
                                    <p>{income.name} : ${income.amount}</p>
                                        <MdDelete
                                            className='dashButton'
                                            onClick={() => handleRemoveIncome(income._id)}
                                        />
                                </div>
                            ) 
                        })}
                        {incomeList.length > 0 ?
                            (   
                                <>
                                    <p className='boldTotal'> Total: ${totalIncomes}</p>
                                    <p className='boldTotal'> Disposable income : ${totalIncomes - totalExpenses} </p>
                                </>
                            ) : 
                            (
                                <p className='boldTotal'>No Income Added</p> 
                            )
                        }
                    </div>
                    <div className='dashboard-card'>
                        <h2 className='dashboard-card-header'> Expenses </h2>
                        {expenseList.map((expense) => {
                            return (
                                <div
                                key={`${expense._id}`}
                                className='dashboard-card-content'>
                                <CiEdit
                                    className='dashButton'
                                    // onClick={() => handleEditExpense(expense._id)}
                                />
                                    <p>{expense.name} : ${expense.cost}</p>
                                        <MdDelete
                                            className='dashButton'
                                            onClick={() => handleRemoveExpense(expense._id)}
                                        />
                                </div>
                            ) 
                        })}
                        {totalExpenses > 0 ?
                            (
                                <p className='boldTotal'> Total: ${totalExpenses}</p>
                            ) :
                            (
                                <p className='boldTotal'>No Expenses Added</p> 
                            )
                        }
                    </div>
                </div>
            </section>
            <section className='chartsDashboardContainer'>
                {(totalExpenses.length !== 0 ) ?
                ( 
                <div className="DoughnutChartHolder">
                    <h2 className='chartTitle'> Expenses Breakdown </h2>
                    <DoughnutChart />
                </div>
                )
                : ''}
                {(totalIncomes.length !== 0 ) ?
                ( 
                <div className="BarChartHolder">
                    <h2 className='chartTitle'> Income Breakdown </h2>
                    <BarChart />
                </div>
                )
                : ''}
                <div className='spacer'></div>
                {(totalIncomes.length !== 0 && totalExpenses.length !== 0) ?
                ( 
                <div className="LineChartHolder">
                    <h2 className='chartTitle'>Savings Vs Investing Forecasting</h2>
                    <LineChart />
                </div>
                )
                : ''}
            </section>
            <div className='spacer'></div>
        </div>
    )
}

export default AddExpense;