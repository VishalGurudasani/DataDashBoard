import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../API/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../CSS/chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadBarChart = async () => {
      const response = await fetchBarChart(month);
      setChartData(response.data);
    };
    loadBarChart();
  }, [month]);

  const labels = chartData.map((range) => range.range);
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Items',
        data: chartData.map((range) => range.count),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        text: `Price Range Distribution for ${month}`,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Bar Chart</h2>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
