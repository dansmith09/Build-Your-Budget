import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../../utils/mutations';


function AddExpense(props) {

    const [formState, setFormState] = useState({ name: '', cost: '' });
    const [addExpense, { error }] = useMutation(ADD_EXPENSE);

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
                    ...formState 
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
        </div>
    )
}

export default AddExpense;