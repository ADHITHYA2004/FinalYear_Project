import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DepositPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};

  const [denominations, setDenominations] = useState({
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    2000: 0,
  });

  const handleChange = (event, denomination) => {
    setDenominations({
      ...denominations,
      [denomination]: parseInt(event.target.value || 0, 10),
    });
  };

  const calculateTotal = () => {
    return Object.entries(denominations).reduce(
      (total, [denomination, count]) => total + denomination * count,
      0
    );
  };

  const handleNext = () => {
    const total = calculateTotal();
    navigate('/authentication', { state: { user, total } });
  };

  return (
    <div>
      <h1>Deposit Page</h1>
      <p><strong>User:</strong> {user.name || 'Unknown'}</p>
      <p><strong>Account Number:</strong> {user.accountNumber || 'Unknown'}</p>

      <h2>Enter Currency Denominations</h2>
      <div>
        {Object.keys(denominations).map((denomination) => (
          <div key={denomination}>
            <label>
              ₹{denomination}: 
              <input
                type="number"
                min="0"
                value={denominations[denomination]}
                onChange={(e) => handleChange(e, denomination)}
              />
            </label>
          </div>
        ))}
      </div>

      <h3>Total Amount: ₹{calculateTotal()}</h3>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DepositPage;
