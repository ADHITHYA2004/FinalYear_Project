import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ChallanPage.module.css';

const ChallanPage = () => {
  const location = useLocation();
  const { user, total } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.challanCard}>
        <h1 className={styles.title}>Transaction Challan</h1>
        <div className={styles.details}>
          <p><strong>Name:</strong> {user?.name || 'Unknown'}</p>
          <p><strong>Account Number:</strong> {user?.accountNumber || 'Unknown'}</p>
          <p><strong>IFSC Code:</strong> {user?.ifscCode || 'Unknown'}</p>
          <p><strong>Transaction Amount:</strong> ₹{total || '0'}</p>
        </div>
        <button onClick={handlePrint} className={styles.printButton}>Print Challan</button>
      </div>
    </div>
  );
};

export default ChallanPage;
