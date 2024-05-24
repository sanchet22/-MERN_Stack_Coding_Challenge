import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBarChart(month).then(response => {
      const data = response.data;
      const labels = [
        '0-100', '101-200', '201-300', '301-400', '401-500', '501-600', 
        '601-700', '701-800', '801-900', '901-above'
      ];
      const values = [
        data['0-100'], data['101-200'], data['201-300'], data['301-400'], 
        data['401-500'], data['501-600'], data['601-700'], data['701-800'], 
        data['801-900'], data['901-above']
      ];

      setBarChartData({
        labels: labels,
        datasets: [{
          label: 'Number of Items',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      });
    }).catch(error => {
      console.error('Error fetching bar chart data:', error);
    });
  }, [month]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Bar Chart for {month}</h2>
      <div className="bar-chart">
        <Bar 
          data={barChartData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Number of Items Sold in Different Price Ranges (${month})`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
