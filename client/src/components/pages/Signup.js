import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                email: formState.email,
                password: formState.password,
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    };

    return (
      <div className="form-container">
        <div className='form-header'>
          <h2>Signup</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              className='form-input'
              placeholder="username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"></label>
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
            <label htmlFor="password"></label>
            <input
              className='form-input'
              placeholder="password"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-button">
            <button
            className='signupBtn'
            type="submit">Sign up</button>
          </div>
        </form>
      </div>
    )
}

export default Signup;