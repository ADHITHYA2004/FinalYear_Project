import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc: "",
    phone_no: "",
    customer_address: "",
    pin: "",
    balance: "",
    account_opening_date: "",
    branch: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users from DB
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle deleting a user
  const handleDelete = async (accountNumber) => {
    try {
      await axios.delete(`/users/${accountNumber}`);
      setUsers(users.filter((user) => user.account_number !== accountNumber));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ✅ Handle creating a new user
  const handleCreateUser = async () => {
    try {
      await axios.post("/users", newUser);
      setNewUser({
        account_holder_name: "",
        account_number: "",
        ifsc: "",
        phone_no: "",
        customer_address: "",
        pin: "",
        balance: "",
        account_opening_date: "",
        branch: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // ✅ Handle when Edit button is clicked
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user for editing
    setNewUser({
      account_holder_name: user.account_holder_name,
      account_number: user.account_number,
      ifsc: user.ifsc,
      phone_no: user.phone_no,
      customer_address: user.customer_address,
      pin: user.pin,
      balance: user.balance,
      account_opening_date: user.account_opening_date,
      branch: user.branch,
    });
  };

  // ✅ Handle updating an existing user
  const handleUpdateUser = async () => {
    if (!editingUser || !editingUser.account_number) {
      console.error("Error: Account number is missing for update.");
      return;
    }

    try {
      const response = await axios.put(`/users/${editingUser.account_number}`, {
        name: editingUser.account_holder_name,  // ✅ Fix: match backend field name
        ifsc: editingUser.ifsc,
        phoneNo: editingUser.phone_no,
        address: editingUser.customer_address,
        pin: editingUser.pin,
        balance: editingUser.balance,
        accountOpeningDate: editingUser.account_opening_date,
        branch: editingUser.branch
      });

      console.log("🟢 Update response:", response.data);

      // ✅ Update UI with latest data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.account_number === editingUser.account_number ? response.data.user : user
        )
      );

      setEditingUser(null);
      fetchUsers(); // ✅ Ensure UI refreshes with updated DB data
    } catch (error) {
      console.error("🔴 Error updating user:", error);
    }
  };




  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

      {/* ✅ Form for adding/updating users */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.account_holder_name}
          onChange={(e) =>
            setNewUser({ ...newUser, account_holder_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Account Number"
          value={newUser.account_number}
          onChange={(e) =>
            setNewUser({ ...newUser, account_number: e.target.value })
          }
          disabled={editingUser !== null} // Prevent editing account number
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={newUser.ifsc}
          onChange={(e) => setNewUser({ ...newUser, ifsc: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone No"
          value={newUser.phone_no}
          onChange={(e) => setNewUser({ ...newUser, phone_no: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.customer_address}
          onChange={(e) =>
            setNewUser({ ...newUser, customer_address: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="PIN"
          value={newUser.pin}
          onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={newUser.balance}
          onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })}
        />
        <input
          type="date"
          placeholder="Account Opening Date"
          value={newUser.account_opening_date}
          onChange={(e) =>
            setNewUser({ ...newUser, account_opening_date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Branch"
          value={newUser.branch}
          onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })}
        />

        {/* ✅ Show "Create User" OR "Update User" button based on editing mode */}
        {editingUser ? (
          <button onClick={handleUpdateUser}>Update User</button>
        ) : (
          <button onClick={handleCreateUser}>Create User</button>
        )}
      </div>

      {/* ✅ User Table */}
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
            <th>Account Opening Date</th>
            <th>Branch</th>
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
              <td>{user.account_opening_date}</td>
              <td>{user.branch}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.account_number)}>
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
