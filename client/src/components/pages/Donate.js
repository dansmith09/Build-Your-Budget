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
                <h1 className='donate-header'>This will be the donation page</h1>
                <p>Donate to unlock addition features.</p>
            </div>
            <button
            onClick={() => stripeDonate(1)}
             id="button">
                5
            </button>
            <button
            onClick={() => stripeDonate(2)}
             id="button">
                10
            </button>
            <button
            onClick={() => stripeDonate(3)}
             id="button">
               20
            </button>
            <button
            onClick={() => stripeDonate(4)}
             id="button">
               50
            </button>
            
            <button
            onClick={() => stripeDonate(5)}
             id="button">
                100
            </button>
        </div>
    )
}