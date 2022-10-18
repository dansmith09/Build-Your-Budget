import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EXPENSE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import DoughnutChart from '../../charts/DoughnutChart'


function AddExpense(props) {
    const [userData, setUserData] = useState({});
    const [formState, setFormState] = useState({ name: '', cost: '' });
    const [addExpense, { error }] = useMutation(ADD_EXPENSE);
    const { loading, data} = useQuery(QUERY_ME);

    

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
        console.log(data);
    },[data])

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value});
        console.log(formState);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addExpense({
                variables: {
                    userId: userData.me._id,
                    expenseData: {
                        name: formState.name,
                        cost: parseFloat(formState.cost)
                    }
                }
            });
            console.log(formState);
        } catch (err) {
            console.log(err)
        }

        setFormState({
            name: '',
            cost: '',
        })
    }



    return (
        <div>
            <div className='dash-header-container'>
                <h1 className='dash-header'>This will be the dashboard page</h1>
                <p>This will have lots of functionality!</p>
            </div>
            <div className='dashboard-container'>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <p> add an expense</p>
                    </div>
                    <div>
                    <label htmlFor="name"></label>
                        <input
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
            <DoughnutChart />
        </div>
    )
}

export default AddExpense;