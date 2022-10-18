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
          return `${Math.round((expense.cost/data.me.totalExpenses)*100)}%: ${expense.name}`
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
          'rgba(255, 105, 235, 0.2)',
          'rgba(255, 134, 200, 0.2)',
          'rgba(255, 163, 165, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
}

export default DoughnutChart;