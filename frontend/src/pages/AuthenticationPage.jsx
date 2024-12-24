import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import translation hook
import styles from './AuthenticationPage.module.css';

const AuthenticationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook
  const { user, total, denominations } = location.state || {}; // Get denominations from state

  const [method, setMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAuthentication = () => {
    setError('');
    if (method === 'PIN') {
      if (inputValue === '1234') {
        navigate('/challan', { state: { user, total, denominations } }); // Pass denominations
      } else {
        setError(t('invalidPin'));
      }
    } else if (method === 'OTP') {
      if (inputValue === '567890') {
        navigate('/challan', { state: { user, total, denominations } }); // Pass denominations
      } else {
        setError(t('invalidOtp'));
      }
    } else if (method === 'Biometric') {
      navigate('/challan', { state: { user, total, denominations } }); // Pass denominations
    } else {
      setError(t('selectMethodError'));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('authenticationPageTitle')}</h1>
        <p className={styles.subtitle}>
          {t('userLabel')} {user?.name || t('unknown')}
        </p>
        <p className={styles.subtitle}>
          {t('accountNumberLabel')} {user?.accountNumber || t('unknown')}
        </p>
        <p className={styles.subtitle}>
          {t('totalAmountLabel')} ₹{total || 0}
        </p>

        <h2 className={styles.subtitle}>{t('selectAuthMethod')}</h2>
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
            <h3 className={styles.subtitle}>{t('enterMethod', { method })}</h3>
            <input
              type={method === 'Biometric' ? 'button' : 'text'}
              placeholder={
                method === 'PIN'
                  ? t('pinPlaceholder')
                  : method === 'OTP'
                  ? t('otpPlaceholder')
                  : t('simulateBiometric')
              }
              value={method === 'Biometric' ? t('simulateBiometric') : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={method === 'Biometric' ? handleAuthentication : undefined}
              className={styles.input}
            />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleAuthentication} className={styles.button}>
          {t('authenticateButton')}
        </button>
      </div>
    </div>
  );
};

export default AuthenticationPage;
