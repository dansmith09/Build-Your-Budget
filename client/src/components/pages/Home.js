import React from 'react';
import { DiJavascript } from 'react-icons/di';
import { DiHtml5 } from 'react-icons/di';
import { DiReact } from 'react-icons/di';
import { DiCss3 } from 'react-icons/di'
import { FaNodeJs } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import { SiApollographql } from 'react-icons/si';
import { SiChartdotjs } from 'react-icons/si';
import { GrGraphQl } from 'react-icons/gr';
import { SiHeroku } from 'react-icons/si';

export default function Home(){
    return (
        <section>
            <div className='home-header-container'>
                <h1>
                    The Next Generation Expense Planner
                </h1>
            </div>
            {/* ////////////////////// FEATURES GRID /////////////////////////////*/}
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
                            <p>Access your dashboard from all devices and locations
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
            {/* ////////////////////// HOMEPAGE ILLUSTRATION /////////////////////////////*/}
            <section className='homepage-illustration'></section>
            {/* /////////////////////// TECH GRID ///////////////////////////////////////*/}
            <section className='tech-section'>
                <div className='card-section-head'>
                    <h1 className='card-section-header'>Tech</h1>
                    <p className='tech-content-para' >Expense was created by two student web developers, Dan and Ruben.</p>
                </div>
            
                <div className='tech-container'>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <DiJavascript className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <DiHtml5 className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <DiCss3 className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <DiReact className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <FaNodeJs className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <SiMongodb className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <SiApollographql className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <SiChartdotjs className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <GrGraphQl className='tech-icon' />
                        </div>
                    </div>
                    <div className='tech-cards'>
                        <div className='tech-content'>
                            <SiHeroku className='tech-icon' />
                        </div>
                    </div>
                    

                </div>
            </section>
        </section>
        
    )
}