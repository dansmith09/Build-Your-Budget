import React from 'react';

export default function Home(){
    return (
        <section>
            <div>
                <div className="element-one-container">
                    <h1 className="element-one-header">
                        The Next <br className="sm:block hidden" />{" "}
                        <span className="text-gradient">Generation</span>{" "}
                    </h1>
                    {/* <div
                        className="ss:flex hidden md:mr-4 mr-0">
                    </div> */}
                </div>
                <h1 className="element-one-header">
                    Expense Planner.
                </h1>
            </div>
        </section>
        
    )
}