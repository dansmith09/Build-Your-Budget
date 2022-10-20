import React from 'react';

export default function Home(){
    return (
        <section>
            <div className='home-header-container'>
                <h1>
                    The Next Generation Expense Planner
                </h1>
            </div>
            <section className='cards-section'>
                <div className='card-section-head'>
                    <h1 className='card-section-header'>Features</h1>
                </div>
            
                <div className='container'>
                    <div className='cards'>
                        <div className='card-content'>
                            <h3>Data</h3>
                            <p>Automated data conversion for easy readability
                            </p>
                        </div>
                    </div>
                    <div className='cards'>
                        <div className='card-content'>
                            <h3>Tracking</h3>
                                <p>Monitor and keep an accurate record of your income and spending on a daily basis</p>
                        </div>
                    </div>
                    <div className='cards'>
                        <div className='break-section'></div>
                        <div className='card-content'>
                            <h3>Access</h3>
                            <p>Access your profile from all devices and locations
                            </p>
                        </div>
                    </div>
                    <div className='cards'>
                        <div className='break-section'></div>
                        <div className='card-content'>
                            <h3>Breakdown</h3>
                            <p>Expand the utility of your assets by viewing where you are spending and saving
                            </p>
                        </div>
                    </div>
                    <div className='cards'>
                        <div className='break-section'></div>
                        <div className='card-content'>
                            <h3>Premium</h3>
                            <p>Unlock additional features by upgrading to premium
                            </p>
                        </div>
                    </div>

                </div>
            </section>
            <section className='homepage-illustration'>

            </section>
        </section>
        
    )
}