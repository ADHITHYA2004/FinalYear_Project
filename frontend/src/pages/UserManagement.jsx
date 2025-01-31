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



// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import styles from './UserManagement.module.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/users/${id}`);
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

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
  const [newUser, setNewUser] = useState({
    name: '',
    accountNumber: '',
    ifsc: '',
    phoneNo: '',
    address: '',
    pin: '',
    balance: '',
    accountOpeningDate: '',
    branch: ''
  });
  const [editingUser, setEditingUser] = useState(null);

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

  const handleDelete = async (accountNumber) => {
    try {
      await axios.delete(`/users/${accountNumber}`);
      setUsers(users.filter((user) => user.account_number !== accountNumber));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('/users', {
        account_holder_name: newUser.name,
        account_number: newUser.accountNumber,
        ifsc: newUser.ifsc,
        phone_no: newUser.phoneNo,
        customer_address: newUser.address,
        pin: newUser.pin,
        balance: newUser.balance,
        account_opening_date: newUser.accountOpeningDate, // ✅ New field
        branch: newUser.branch // ✅ New field
      });

      setNewUser({ name: '', accountNumber: '', ifsc: '', phoneNo: '', address: '', pin: '', balance: '', accountOpeningDate: '', branch: '' });
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/users/${editingUser.accountNumber}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

      {/* Form for adding or updating users */}
      <div className={styles.form}>
        <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="text" placeholder="Account Number" value={newUser.accountNumber} onChange={(e) => setNewUser({ ...newUser, accountNumber: e.target.value })} />
        <input type="text" placeholder="IFSC Code" value={newUser.ifsc} onChange={(e) => setNewUser({ ...newUser, ifsc: e.target.value })} />
        <input type="text" placeholder="Phone No" value={newUser.phoneNo} onChange={(e) => setNewUser({ ...newUser, phoneNo: e.target.value })} />
        <input type="text" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
        <input type="number" placeholder="PIN" value={newUser.pin} onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })} />
        <input type="number" placeholder="Balance" value={newUser.balance} onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })} />
        <input type="date" placeholder="Account Opening Date" value={newUser.accountOpeningDate} onChange={(e) => setNewUser({ ...newUser, accountOpeningDate: e.target.value })} />  {/* ✅ New Field */}
        <input type="text" placeholder="Branch" value={newUser.branch} onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })} />  {/* ✅ New Field */}
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      {/* User Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>IFSC</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>PIN</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.account_number}>
              <td>{user.account_holder_name}</td>
              <td>{user.account_number}</td>
              <td>{user.ifsc}</td>
              <td>{user.phone_no}</td>
              <td>{user.customer_address}</td>
              <td>{user.pin}</td>
              <td>₹{user.balance}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user.account_number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {editingUser && <button onClick={handleUpdateUser}>Update User</button>}
    </div>
  );
};

export default UserManagement;

