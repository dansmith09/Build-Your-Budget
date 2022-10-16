import React from 'react';
import Auth from '../utils/auth';
// In order to use conditional styling (active/hover), we need to use NavLink. ( React Router v4)
import { NavLink as Link } from 'react-router-dom'



function NavTabs() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className='navbar'>
                    <li className='navbar-items'>
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')}
                        to="/home">
                            home
                        </Link>
                    </li>
                    <li className='navbar-items'>
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')}
                        to="/dashboard">
                            dashboard
                        </Link>
                    </li>
                    <li className='navbar-items'>
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')} 
                        to="/donate">
                            donate
                        </Link>
                    </li >
                    <li className='navbar-items'>
                        <a className='navTab' href="/home" onClick={() => Auth.logout()}>
                            logout
                        </a>
                    </li>   
                </ul>
            )
        } else {
            return (
                <ul className="navbar">
                    <li className="navbar-items">
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')}
                        to="/home">
                            home
                        </Link>
                    </li>
                    <li className="navbar-items">
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')}
                        to="/signup">
                            signup
                        </Link>
                    </li>
                    <li className="navbar-items">
                        <Link
                        className={({ isActive }) => (isActive ? 'active-navTab' : 'navTab')}
                        to="/login">
                            login
                        </Link>
                    </li>
                </ul> 
            )
        }
    };
    return (
        <div>
            <header>
                <nav>
                {showNavigation()}
                </nav>
            </header>
        </div>
    );
}



export default NavTabs;