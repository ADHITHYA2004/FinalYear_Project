import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import styles from './UserDetailsPage.module.css'; // Import CSS module
import UserDetails from '../components/UserDetails';

const UserDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook
  const [user, setUser] = useState(null);

  // Extract OCR data passed from the previous page
  const { state } = location;
  const accountNumber = state?.accountNumber;
  const ifscCode = state?.ifscCode;

  useEffect(() => {
    // Simulate fetching user details from the backend
    const fetchUserDetails = async () => {
      // Simulated user data
      const mockUser = {
        name: 'ADHITHYA S',
        accountNumber: accountNumber || t('unknown'),
        branch: 'Tiruchengode Town Branch',
        ifscCode: ifscCode || t('unknown'),
      };

      setUser(mockUser);
    };

    fetchUserDetails();
  }, [accountNumber, ifscCode, t]); // Add `t` to dependency array for translations

  const handleAction = (action) => {
    navigate(`/${action}`, { state: { user } }); // Navigate to Deposit or Withdrawal page
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{t('userDetails')}</h2>
        <p className={styles.detailRow}>
          <strong>{t('name')}:</strong> {user?.name}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('accountNumber')}:</strong> {user?.accountNumber}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('branch')}:</strong> {user?.branch}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('ifscCode')}:</strong> {user?.ifscCode}
        </p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAction('deposit')}>
          {t('deposit')}
        </button>
        <button className={styles.button} onClick={() => handleAction('withdrawal')}>
          {t('withdrawal')}
        </button>
        <button className={styles.button}
  onClick={() =>
    navigate('/transaction-history', { state: { accountNumber: user.accountNumber } })
  }
>
  View Transactions
</button>

      </div>
    </div>
  );
};

export default UserDetailsPage;
