import React from 'react';

const UserDetails = ({ user }) => {
  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Account Number:</strong> {user.accountNumber}</p>
      <p><strong>Branch:</strong> {user.branch}</p>
      <p><strong>IFSC Code:</strong> {user.ifscCode}</p>
    </div>
  );
};

export default UserDetails;
