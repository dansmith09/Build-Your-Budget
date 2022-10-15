import React from 'react';

export default function Home(){
    return (
        <div>
            <div className='home-header-container'>
                <h1 className='home-header'>Expense</h1>
                <p>This is a budget building application. Soon, you will be able to download it!</p>
            </div>
            <div className="element-one-container">
                <h1 className="element-one-header">
                    The Next <br className="sm:block hidden" />{" "}
                    <span className="text-gradient">Generation</span>{" "}
                </h1>
                <div
                    className="ss:flex hidden md:mr-4 mr-0">
                </div>
            </div>
            <h1 className="element-one-header font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
                Expense Planner
            </h1>
        </div>
    )
}