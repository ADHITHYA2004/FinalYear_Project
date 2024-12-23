// import React, { useState } from 'react';
// import styles from './UserManagement.module.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: 'John Doe', accountNumber: '123456789', balance: 5000 },
//     { id: 2, name: 'Jane Smith', accountNumber: '987654321', balance: 8000 },
//   ]);

//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>User Management</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Account Number</th>
//             <th>Balance</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.accountNumber}</td>
//               <td>₹{user.balance}</td>
//               <td>
//                 <button onClick={() => handleDelete(user.id)} className={styles.deleteButton}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.accountNumber}</td>
              <td>₹{user.balance}</td>
              <td>
                <button onClick={() => handleDelete(user.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
