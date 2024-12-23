import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AuthenticationPage.module.css';

const AuthenticationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, total } = location.state || {};

  const [method, setMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAuthentication = () => {
    setError('');
    if (method === 'PIN') {
      if (inputValue === '1234') {
        navigate('/challan', { state: { user, total } }); // Replace `/challan` with your next page
      } else {
        setError('Invalid PIN. Please try again.');
      }
    } else if (method === 'OTP') {
      if (inputValue === '567890') {
        navigate('/challan', { state: { user, total } });
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } else if (method === 'Biometric') {
      navigate('/challan', { state: { user, total } });
    } else {
      setError('Please select an authentication method.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Authentication Page</h1>
        <p className={styles.subtitle}>User: {user?.name || 'Unknown'}</p>
        <p className={styles.subtitle}>Account Number: {user?.accountNumber || 'Unknown'}</p>
        <p className={styles.subtitle}>Total Amount: ₹{total || '0'}</p>

        <h2 className={styles.subtitle}>Select Authentication Method</h2>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="auth-method"
              value="PIN"
              onChange={() => setMethod('PIN')}
            />
            PIN
          </label>
          <label>
            <input
              type="radio"
              name="auth-method"
              value="OTP"
              onChange={() => setMethod('OTP')}
            />
            OTP
          </label>
          <label>
            <input
              type="radio"
              name="auth-method"
              value="Biometric"
              onChange={() => setMethod('Biometric')}
            />
            Biometric
          </label>
        </div>

        {method && (
          <div className={styles.inputContainer}>
            <h3 className={styles.subtitle}>Enter {method}</h3>
            <input
              type={method === 'Biometric' ? 'button' : 'text'}
              placeholder={
                method === 'PIN' ? 'Enter PIN' : method === 'OTP' ? 'Enter OTP' : 'Simulating Biometric...'
              }
              value={method === 'Biometric' ? 'Simulate Biometric' : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={method === 'Biometric' ? handleAuthentication : undefined}
              className={styles.input}
            />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleAuthentication} className={styles.button}>
          Authenticate
        </button>
      </div>
    </div>
  );
};

export default AuthenticationPage;
