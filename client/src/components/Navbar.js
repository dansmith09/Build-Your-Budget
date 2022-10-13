import React from 'react';

function NavTabs({ currentPage, handlePageChange}) {
    return(
        <ul>
            <li>
                <a
                href="#home"
                onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'active-navTab' : 'navTab'}
                >
                    Home
                </a>
            </li>
            <li>
                <a
                href="#home"
                onClick={() => handlePageChange('Dashboard')}
                className={currentPage === 'Dashboard' ? 'active-navTab' : 'navTab'}
                >
                    dashboard
                </a>
            </li>
            <li>
                <a
                href="#home"
                onClick={() => handlePageChange('Donate')}
                className={currentPage === 'Donate' ? 'active-navTab' : 'navTab'}
                >
                    donate
                </a>
            </li>
            {/* Login isnt working yet */}
            {/* <li>
                <a
                href="#home"
                onClick={() => handlePageChange('Login')}
                className={currentPage === 'Login' ? 'active-navTab' : 'navTab'}
                >
                    login
                </a>
            </li> */}
        </ul>
    )
}

export default NavTabs;