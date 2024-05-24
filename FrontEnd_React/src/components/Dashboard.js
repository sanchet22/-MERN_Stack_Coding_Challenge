import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';
import BarChart from './BarChart';
import PieChart from './PieChart';
import '../App.css'; 

const Dashboard = () => {
  const [month, setMonth] = useState('March');

  return (
    <div className="dashboard">
      <h1>Transaction Dashboard</h1>
      <div className="month-selector">
        <label>Select Month: </label>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default Dashboard;
