import React, { useEffect, useState }from 'react';
import { useQuery } from '@apollo/client';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { QUERY_ME } from './../utils/queries';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const BarChart = () => {
  const [labels, setLabels] = useState()
  const [userChartData, setUserChartData] = useState({})

  const { loading, data} = useQuery(QUERY_ME);

  useEffect(() => {
      if (data) {
        setLabels(['Income', 'Expenses', 'Disposable Income'])
        setUserChartData([
            data.me.totalIncomes,
            - data.me.totalExpenses,
            data.me.totalIncomes - data.me.totalExpenses
        ])
      }
  },[data])

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: labels,
        data: userChartData,
        backgroundColor: [
            'rgba(39, 245, 91, 0.2)',
            'rgba(245, 78, 39, 0.2)',
          (userChartData[2] < 0) ? 'rgba(245, 78, 39, .2)' : 'rgba(39, 245, 91, .2)',
        ],
        borderColor: [
          'rgba(39, 245, 91, 1)',
          'rgba(245, 78, 39, 1)',
          (userChartData[2] < 0) ? 'rgba(245, 78, 39, 1)' : 'rgba(39, 245, 91, 1)',
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: { color: 'white' }
      },
      x: {
        ticks: { color: 'white' }
      }
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          fontColor: 'white'
        },
        display: false
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options}/>
    </div>
  );
}

export default BarChart;