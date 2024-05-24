import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchStatistics } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../App.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchStatistics(month).then(response => {
      const data = response.data;
      const labels = ['Sold Items', 'Not Sold Items'];
      const values = [data.totalSoldItems, data.totalNotSoldItems];

      setPieChartData({
        labels: labels,
        datasets: [{
          label: 'Number of Items',
          data: values,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        }]
      });
    }).catch(error => {
      console.error('Error fetching pie chart data:', error);
    });
  }, [month]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Pie Chart for {month}</h2>
      <div className="pie-chart">
        <Pie 
          data={pieChartData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Distribution of Sold and Not Sold Items (${month})`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
