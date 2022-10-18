import {
    Chart,
    CategoryScale,
    LinearScale,
    DoughnutController,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"
import React, { useState, useEffect, useRef } from 'react';


const ExpenseDonughtChart = () => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })
    
    const [chartOptions, setChartOption] = useState({})

    useEffect(() => {
        setChartData({
            labels: [
                'Rent',
                'Groceries',
                'Petrol',
                'Gym'
              ],
            datasets: [
                {
                   labels: 'Expense Breakdown',
                   data: [500, 150, 100, 70],
                   backgroundColor: [
                     'rgb(255, 99, 132)',
                     'rgb(54, 162, 235)',
                     'rgb(255, 205, 86)',
                     'rgb(99, 112, 255)'
                   ],
                   hoverOffset: 4
                }
            ]
        })
    },[])

    return (
        <>
            <>GRAPH COMPONENT</>

             <DoughnutController
             data={{}}
             height={400}
             width={400}
             />
        </>
    )
}

export default ExpenseDonughtChart;