import React, { useEffect, useState }from 'react';
import { useQuery } from '@apollo/client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { QUERY_ME } from './../utils/queries';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = () => {
  const [userData, setUserData] = useState({})
  const [labels, setLabels] = useState({})
  const [userChartData, setUserChartData] = useState({})

  const { loading, data} = useQuery(QUERY_ME);

  useEffect(() => {
      if (data) {
        setLabels(data.me.expenses.map((expense) => {
          return `${Math.round((expense.cost/data.me.totalExpenses)*100)}% ${expense.name}`
        } ))
        setUserChartData(data.me.expenses.map(({cost}) => cost))
      }
  },[data])

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: userChartData,
        backgroundColor: [
          'rgba(255, 113, 113, 0.2)',
          'rgba(255, 166, 113, 0.2)',
          'rgba(255, 205, 113, 0.2)',
          'rgba(255, 243, 113, 0.2)',
          'rgba(208, 255, 113, 0.2)',
          'rgba(137, 255, 113, 0.2)',
          'rgba(113, 255, 164, 0.2)',
          'rgba(113, 255, 231, 0.2)',
          'rgba(113, 220, 255, 0.2)',
          'rgba(113, 158, 255, 0.2)',
          'rgba(125, 113, 255, 0.2)',
          'rgba(187, 113, 255, 0.2)',
          'rgba(246, 113, 255, 0.2)',
          'rgba(255, 113, 211, 0.2)',
          'rgba(255, 113, 155, 0.2)'
        ],
        borderColor: [
          'rgba(255, 113, 113, 1)',
          'rgba(255, 166, 113, 1)',
          'rgba(255, 205, 113, 1)',
          'rgba(255, 243, 113, 1)',
          'rgba(208, 255, 113, 1)',
          'rgba(137, 255, 113, 1)',
          'rgba(113, 255, 164, 1)',
          'rgba(113, 255, 231, 1)',
          'rgba(113, 220, 255, 1)',
          'rgba(113, 158, 255, 1)',
          'rgba(125, 113, 255, 1)',
          'rgba(187, 113, 255, 1)',
          'rgba(246, 113, 255, 1)',
          'rgba(255, 113, 211, 1)',
          'rgba(255, 113, 155, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Doughnut 
        data={chartData}
        options={
          {
            plugins: {
                legend: {
                    display: true,
                    position:'bottom',
                    labels: {
                        color: 'white'
                    }
                }
            }
          }
        }
      />
    </div>
  );
}

export default DoughnutChart;