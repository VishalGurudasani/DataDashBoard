import React, { useState } from 'react';
import Transaction from './Transaction'; 
import Statistics from './Statistics';
import BarGraph from './BarChart';
import PieChart from './PieChart'; 
import '../CSS/navbar.css'; 

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('transaction'); 
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const renderContent = () => {
    if (activeTab === 'transaction') {
      return <Transaction month={selectedMonth} />;
    } else if (activeTab === 'statistics') {
      return <Statistics month={selectedMonth} />;
    } else if (activeTab === 'bargraph') {
      return <BarGraph month={selectedMonth} />;
    } else if (activeTab === 'piechart') {
      return <PieChart month={selectedMonth} />;
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="month-selector">
          <label htmlFor="month">Select Month: </label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>
        <ul className="nav-links">
          <li
            className={activeTab === 'transaction' ? 'active' : ''}
            onClick={() => setActiveTab('transaction')}
          >
            Transaction
          </li>
          <li
            className={activeTab === 'statistics' ? 'active' : ''}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </li>
          <li
            className={activeTab === 'bargraph' ? 'active' : ''}
            onClick={() => setActiveTab('bargraph')}
          >
            Bar Graph
          </li>
          <li
            className={activeTab === 'piechart' ? 'active' : ''}
            onClick={() => setActiveTab('piechart')}
          >
            Pie Chart
          </li>
        </ul>
      </nav>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default NavBar;
