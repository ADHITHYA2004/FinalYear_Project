// import React from 'react';
// import styles from './TransactionMonitor.module.css';

// const TransactionMonitor = () => {
//   const transactions = [
//     { id: 1, user: 'John Doe', amount: 1000, type: 'Deposit', date: '2024-12-21' },
//     { id: 2, user: 'Jane Smith', amount: 500, type: 'Withdrawal', date: '2024-12-22' },
//   ];

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Transaction Monitor</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Amount</th>
//             <th>Type</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((txn) => (
//             <tr key={txn.id}>
//               <td>{txn.user}</td>
//               <td>₹{txn.amount}</td>
//               <td>{txn.type}</td>
//               <td>{txn.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TransactionMonitor;
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styles from './TransactionMonitor.module.css';

const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transaction Monitor</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.user}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.type}</td>
              <td>{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionMonitor;
