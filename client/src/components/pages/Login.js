import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
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
      <div className="form-container">
        <div className='form-header'>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className='input-field' htmlFor="email"></label>
            <input
              className='form-input'
              placeholder="email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
            <div className="form-group">
              <label className='input-field' htmlFor="pwd"></label>
              <input
                className='form-input'
                placeholder="password"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>
          {error ? (
            <div>
              <p className="error-text">Incorrect credentials</p>
            </div>
          ) : null}
            <div className="form-button">
              <button 
              className='signupBtn' 
              type="submit">Login</button>
            </div>
        </form>
      </div>
    )



}

export default Login;