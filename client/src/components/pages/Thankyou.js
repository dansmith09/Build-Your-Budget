import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function Signup(props) {

    return (
      <div className='home-header-container'>
        <h1>Thank you for your donation!<br></br>
          <span className='card-section-header'>Enjoy your additional features!</span>
        </h1>
      </div>
    )
}

export default Signup;