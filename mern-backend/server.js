const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let data = [];

axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
  .then(response => {
    data = response.data;
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

// Endpoint to get transactions with pagination and search
app.get('/transactions', (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  let filteredData = data;

  if (month) {
    filteredData = filteredData.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
  }

  if (search) {
    filteredData = filteredData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()));
  }

  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

  res.json(paginatedData);
});

// Endpoint to get statistics
app.get('/statistics', (req, res) => {
  const { month } = req.query;
  let filteredData = data;

  if (month) {
    filteredData = filteredData.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
  }

  const totalSaleAmount = filteredData.reduce((acc, item) => item.sold ? acc + item.price : acc, 0);
  const totalSoldItems = filteredData.filter(item => item.sold).length;
  const totalNotSoldItems = filteredData.filter(item => !item.sold).length;

  res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
});

// Endpoint to get bar chart data
app.get('/barchart', (req, res) => {
  const { month } = req.query;
  let filteredData = data;

  if (month) {
    filteredData = filteredData.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
  }

  const priceRanges = {
    '0-100': 0,
    '101-200': 0,
    '201-300': 0,
    '301-400': 0,
    '401-500': 0,
    '501-600': 0,
    '601-700': 0,
    '701-800': 0,
    '801-900': 0,
    '901-above': 0,
  };

  filteredData.forEach(item => {
    if (item.price <= 100) priceRanges['0-100']++;
    else if (item.price <= 200) priceRanges['101-200']++;
    else if (item.price <= 300) priceRanges['201-300']++;
    else if (item.price <= 400) priceRanges['301-400']++;
    else if (item.price <= 500) priceRanges['401-500']++;
    else if (item.price <= 600) priceRanges['501-600']++;
    else if (item.price <= 700) priceRanges['601-700']++;
    else if (item.price <= 800) priceRanges['701-800']++;
    else if (item.price <= 900) priceRanges['801-900']++;
    else priceRanges['901-above']++;
  });

  res.json(priceRanges);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
