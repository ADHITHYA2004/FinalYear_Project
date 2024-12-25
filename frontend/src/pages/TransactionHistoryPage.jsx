import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TransactionHistoryPage.module.css';

const TransactionHistoryPage = () => {
  const location = useLocation();
  const { accountNumber } = location.state || {}; // Get account number from navigation state
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/${accountNumber}`);
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Failed to load transactions');
      }
    };

    if (accountNumber) fetchTransactions();
  }, [accountNumber]);

  if (!accountNumber) {
    return <div>Error: Account number not provided</div>;
  }
  


  return (
    <div className={styles.container}>
      <h1>Transaction History</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!error && transactions.length === 0 && <p>No transactions available</p>}
      {transactions.length > 0 && (
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.type}</td>
                <td>₹{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>₹{transaction.balance_after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistoryPage;
