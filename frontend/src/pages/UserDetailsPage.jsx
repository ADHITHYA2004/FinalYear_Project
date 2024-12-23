import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserDetails from '../components/UserDetails';

const UserDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
        name: 'Gokulraj P',
        accountNumber: accountNumber || 'Unknown',
        branch: 'Tiruchengode Town Branch',
        ifscCode: ifscCode || 'Unknown',
      };

      setUser(mockUser);
    };

    fetchUserDetails();
  }, [accountNumber, ifscCode]);

  const handleAction = (action) => {
    navigate(`/${action}`, { state: { user } }); // Navigate to Deposit or Withdrawal page
  };

  return (
    <div>
      <UserDetails user={user} />
      <div>
        <button onClick={() => handleAction('deposit')}>Deposit</button>
        <button onClick={() => handleAction('withdrawal')}>Withdrawal</button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
