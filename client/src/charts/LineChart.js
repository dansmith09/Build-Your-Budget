import React, { useEffect, useState }from 'react';
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
    const [weeksToSimulate, setWeeksToSimulate] = useState(52)
    const [disposableIncome, setDisposableIncome] = useState()

    const { loading, data} = useQuery(QUERY_ME);

    const getInvestingData = (weeksToSimulate, investingPerWeek, marketReturnPerYear = 0.066) => {
        const investingArray = [0]
        for (let index = 0; index < weeksToSimulate; index++) {
            const weeklyMarketReturn = marketReturnPerYear/52;
            const totalInvested = (index+1) * investingPerWeek
            const marketReturn = weeklyMarketReturn * (index+1) * totalInvested;
            const dataPoint = totalInvested + marketReturn;
            investingData.push(dataPoint);
        }
        return investingArray
    }
    const getLabels = (weeksToSimulate) => {
        const weekLabelsArray = ['Week 0']
        for (let index = 0; index < weeksToSimulate; index++) {
            const weekString = 'Week ' + (index + 1)
            weekLabelsArray.push(weekString);
        }
        return weekLabelsArray
    }
    const getSavingsData = (weeksToSimulate, savingsPerWeek) => {
        let savingData = [0];
    for (let index = 0; index < weeksToSimulate; index++) {
        const dataPoint = (index + 1) * savingsPerWeek;
        savingData.push(dataPoint);
    }
    }

    console.log(weeksToSimulate,disposableIncome,labels,investingData,savingsData)


    useEffect(() => {
        if (data) {
            setDisposableIncome(data.me.totalIncomes - data.me.totalExpenses)
            setLabels(getLabels(weeksToSimulate))
            setInvestingData(getInvestingData(
                weeksToSimulate,
                disposableIncome,
                0.066
            ))
            setSavingsData(getSavingsData(
                weeksToSimulate,
                disposableIncome,
                0.066
            ))
         }
    },[data, weeksToSimulate])

    const chartData = {
        labels: labels,
        datasets: [{
        label: 'Saving',
        backgroundColor: 'rgb(99, 112, 255)',
        borderColor: 'rgb(99, 112, 255)',
        data: savingsData,
        },
        {
        label: 'Investing',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: investingData,
        }]
    };

    
    return (
    <div>
        <Line data={chartData} />
    </div>
    );
    

}

export default LineChart;
