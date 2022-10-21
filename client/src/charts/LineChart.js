import React, { useLayoutEffect, useState }from 'react';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { QUERY_ME } from './../utils/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {

    const [savingsData, setSavingsData] = useState()
    const [investingData, setInvestingData] = useState()
    const [labels, setLabels] = useState()
    const [weeksToSimulate, setWeeksToSimulate] = useState(520)
    const [disposableIncome, setDisposableIncome] = useState()
    const { loading, data } = useQuery(QUERY_ME);

    const getLabels = (weeksToSimulate) => {
        const weekLabelsArray = ['Week 0']
        for (let index = 0; index < weeksToSimulate; index++) {
            const weekString = 'Week ' + (index + 1)
            weekLabelsArray.push(weekString);
        }
        return weekLabelsArray
    }

    const getInvestingData = (weeksToSimulate, investingPerWeek, marketReturnPerYear = 0.066) => {
        const investingArray = [0]
        for (let index = 0; index < weeksToSimulate; index++) {
            const weeklyMarketReturn = marketReturnPerYear/52;
            const totalInvested = (index+1) * investingPerWeek
            const marketReturn = weeklyMarketReturn * (index+1) * totalInvested;
            const dataPoint = totalInvested + marketReturn;
            investingArray.push(dataPoint);
        }
        return investingArray;
    }

    const getSavingsData = (weeksToSimulate, savingsPerWeek) => {
        let savingsArray = [0];
        for (let index = 0; index < weeksToSimulate; index++) {
            const dataPoint = (index + 1) * savingsPerWeek;
            savingsArray.push(dataPoint);
        }
        return savingsArray;
    }

    const handleButtonClick = (yearsToSimulate) => {
        setLabels(getLabels(yearsToSimulate * 52))
        setInvestingData(getInvestingData(yearsToSimulate * 52, disposableIncome,0.066))
        setSavingsData(getSavingsData(yearsToSimulate * 52, disposableIncome))
        setWeeksToSimulate(yearsToSimulate * 52)
    }

    useLayoutEffect(() => {
        if (data) {
            setDisposableIncome(data.me.totalIncomes - data.me.totalExpenses)
            setLabels(getLabels(weeksToSimulate))
            setInvestingData(getInvestingData(weeksToSimulate, disposableIncome,0.066))
            setSavingsData(getSavingsData(weeksToSimulate, disposableIncome))
        }
    },[data, disposableIncome])

    const chartData = {
        labels: labels,
        datasets: [
            {
            label: 'Saving',
            backgroundColor: 'rgb(99, 112, 255, 0.2)',
            borderColor: 'rgb(99, 112, 255)',
            data: savingsData,
            },
            {
            label: 'Investing',
            backgroundColor: 'rgb(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            data: investingData,
            }
        ]
    };


    return (
    <div>
        <Line
            data={chartData}
            options={{
                scales: {
                    y: {
                      ticks: { color: 'white' }
                    },
                    x: {
                      ticks: { color: 'white' }
                    }
                },
                plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      },
                    },
                    title: {
                      display: false,
                    },
                },
            }}
        />
        <button className={weeksToSimulate === 52 ? 'lineChartButtonActive' : 'lineChartButton'} onClick={() => handleButtonClick(1)}> 1 Year </button>
        <button className={weeksToSimulate === 260 ? 'lineChartButtonActive' : 'lineChartButton'} onClick={() => handleButtonClick(5)}> 5 Year </button>
        <button className={weeksToSimulate === 520 ? 'lineChartButtonActive' : 'lineChartButton'} onClick={() => handleButtonClick(10)}> 10 Year </button>
        <button className={weeksToSimulate === 1040 ? 'lineChartButtonActive' : 'lineChartButton'} onClick={() => handleButtonClick(20)}> 20 Year </button>
        <button className={weeksToSimulate === 2080 ? 'lineChartButtonActive' : 'lineChartButton'} onClick={() => handleButtonClick(40)}> 40 Year </button>
        {savingsData && investingData ?
            <h3 className='forcastingText'>
                Over a time period of <span>{weeksToSimulate / 52} year{weeksToSimulate === 52? '' : 's' }</span>, assuming a <span>6.6%</span> market return per anum
                and investing <span>${disposableIncome}</span> per week.
                You would save a total of <span>${parseInt(savingsData[savingsData.length - 1])}</span>. However investing would return <span>${parseInt(investingData[investingData.length - 1])}</span>.
                That's <span>${parseInt(investingData[investingData.length - 1]) - parseInt(savingsData[savingsData.length - 1])} more</span> than if you had't invested!
            </h3>
            : ''
        }
    </div>
    );


}

export default LineChart;