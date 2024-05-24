import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions(month, search, page).then(response => {
      setTransactions(response.data);
    });
  }, [month, search, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div style={{ backgroundColor: '#cceeff', padding: '20px', borderRadius: '10px' }}>
      <input 
        type="text" 
        value={search} 
        onChange={handleSearch} 
        placeholder="Search transactions" 
        style={{
          backgroundColor: '#ffffcc',
          border: '1px solid #ccc',
          borderRadius: '20px',
          padding: '8px 16px',
          marginRight: '300%',
        }}
      />
      <br />
      <table style={{ backgroundColor: '#ffffcc', width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
              <td><img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={() => setPage(page => page - 1)} 
        disabled={page === 1}
        style={{ marginTop: '10px', marginRight: '5px' }}
      >
        Previous
      </button>
      <button 
        onClick={() => setPage(page => page + 1)} 
        style={{ marginTop: '10px' }}
      >
        Next
      </button>
    </div>
  );
};

export default TransactionsTable;
