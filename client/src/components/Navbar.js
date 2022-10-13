import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function NavTabs() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className='navbar'>
                    <li className='navbar-items'>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className='navbar-items'>
                        <Link to="/dashboard">
                            dashboard
                        </Link>
                    </li>
                    <li className='navbar-items'>
                        <Link to="/donate">
                            donate
                        </Link>
                    </li >
                        <a href="/" onClick={() => Auth.logout()}>
                            logout
                        </a>
                    <li className='navbar-items'>
                        
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar">
                    <li className="navbar-items">
                    <Link to="/signup">
                        signup
                    </Link>
                    </li>
                    <li className="navbar">
                    <Link to="navbar-items">
                        login
                    </Link>
                    </li>
                </ul> 
            )
        }
    }

    return (
        <nav>
            {showNavigation()}
        </nav>

    );
}



export default NavTabs;