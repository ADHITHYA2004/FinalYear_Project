import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './WithdrawalPage.module.css';

const WithdrawalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    setError('');
    const accountBalance = user?.accountBalance || 0;

    if (!withdrawalAmount || isNaN(withdrawalAmount)) {
      setError('Please enter a valid amount.');
      return;
    }

    if (withdrawalAmount > accountBalance) {
      setError('Insufficient balance. Please enter a lower amount.');
      return;
    }

    navigate('/authentication', { state: { user, withdrawalAmount } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Withdrawal</h1>
        <p className={styles.subtitle}>
          <strong>Account Holder:</strong> {user.name || 'Unknown'}
        </p>
        <p className={styles.subtitle}>
          <strong>Account Balance:</strong> ₹{user.accountBalance || '0'}
        </p>

        <div className={styles.inputContainer}>
          <label htmlFor="withdrawalAmount" className={styles.label}>
            Enter Withdrawal Amount:
          </label>
          <input
            type="number"
            id="withdrawalAmount"
            className={styles.input}
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleNext} className={styles.button}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WithdrawalPage;
