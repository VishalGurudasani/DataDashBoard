import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChart } from '../API/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../CSS/chart.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadPieChart = async () => {
      const response = await fetchPieChart(month);
      setChartData(response.data);
    };
    loadPieChart();
  }, [month]);

  const labels = chartData.map((category) => category._id);  // Assuming _id is the category name
  const data = {
    labels,
    datasets: [
      {
        label: 'Items',
        data: chartData.map((category) => category.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Category Distribution for ${month}`,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Pie Chart</h2>
      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
