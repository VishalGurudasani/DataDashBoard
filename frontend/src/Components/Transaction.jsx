import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../API/api';
import '../CSS/transaction.css'; // Importing CSS for styling

const Transaction = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 4;

  // Load transactions when month, page, or search changes
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetchTransactions(month, page, perPage, search);
        if (response.data) {
          setTransactions(response.data.transactions);
          setTotalPages(response.data.pages); // Assuming the API returns pages count
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
        setTransactions([]); // In case of error, set transactions to empty array
      }
    };

    loadTransactions();
  }, [month, page, search]);

  return (
    <div className="transaction-container">
      <h2>Transactions</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search on based of title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table of transactions */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>${tx.price}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>
                <td>{tx.sold ? 'Yes' : 'No'}</td>
                <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transaction;
