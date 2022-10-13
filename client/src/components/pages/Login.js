import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
// import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';


function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: ''})
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async(event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: {email: formState.email, password: formState.password},
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div>
            <div className='login-container'>
                <h1> This will be the login page</h1>
            </div>
        </div>

        // FORM HERE
            // handleFormSubmit();
            // handleChange();
    )



}

export default Login;