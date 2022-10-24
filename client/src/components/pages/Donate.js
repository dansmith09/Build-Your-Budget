import React from 'react';

export default function Donate() {

    const stripeDonate =  (donationIndex) => {
        console.log(donationIndex)
    fetch('/donation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: donationIndex, quantity: 1}
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        console.log(url)
        window.location = url;
    }).catch(e => {
        console.error(e.error)
    })
}
    
    return (
        <div>
            <div className='donate-header-container'>
                <div>
                    <p>By supporting Expense, you are allowing us to continute developing this application.</p>
                </div>
                <div>
                    <p className='donate-header-content'>Want a 10% discount? Donate via crypto!</p>
                </div>
            </div>
            <div className='donate-button-container'>
                <button
                className='donate-button'
                onClick={() => stripeDonate(1)}
                id="button">
                    $5
                </button>
                <button
                className='donate-button'
                onClick={() => stripeDonate(2)}
                id="button">
                    $10
                </button>
                <button
                className='donate-button'
                onClick={() => stripeDonate(3)}
                id="button">
                    $20
                </button>
                <button
                className='donate-button'
                onClick={() => stripeDonate(4)}
                id="button">
                    $50
                </button>               
                <button
                className='donate-button'
                onClick={() => stripeDonate(5)}
                id="button">
                    $100
                </button>
            </div>
            
        </div>
    )
}