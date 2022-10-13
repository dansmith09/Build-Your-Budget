import React, { useState } from 'react';
import NavTabs from './Navbar';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate'


export default function BudgetContainer() {
    const [currentPage, setCurrentPage] = useState('Home')



    const renderPage = () => {
        if (currentPage === 'Home'){
            return <Home />;
        }
        if (currentPage === 'Dashboard'){
            return <Dashboard />;
        }
        if (currentPage === 'Donate'){
            return <Donate />;
        }
    }

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <NavTabs currentPage={currentPage} handlePageChange={handlePageChange}/>
            {renderPage()}
        </div>
    );
}