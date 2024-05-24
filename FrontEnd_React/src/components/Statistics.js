import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';
import '../App.css';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics(month).then(response => {
      setStatistics(response.data);
    });
  }, [month]);

  return (
    <div>
      <h2>Statistics for {month}</h2>
      <div className="statistics-box">
        <div>Total Sale Amount: ${statistics.totalSaleAmount}</div>
        <div>Total Sold Items: {statistics.totalSoldItems}</div>
        <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
      </div>
    </div>
  );
};

export default Statistics;
