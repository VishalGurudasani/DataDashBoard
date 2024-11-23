import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../API/api';
import '../CSS/statistics.css'; // Import the CSS file

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStatistics = async () => {
      const response = await fetchStatistics(month);
      setStats(response.data);
    };
    loadStatistics();
  }, [month]);

  return (
    <div className="statistics-container">
      <h2>Statistics</h2>
      <div className="stat-item">
        <p>Total Sales Amount: <span>${stats.totalSales || 0}</span></p>
      </div>
      <div className="stat-item">
        <p>Total Sold Items: <span>{stats.totalSoldItems || 0}</span></p>
      </div>
      <div className="stat-item">
        <p>Total Unsold Items: <span>{stats.totalNotSoldItems || 0}</span></p>
      </div>
    </div>
  );
};

export default Statistics;
