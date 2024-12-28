const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Replace with your PostgreSQL pool configuration

// Get transactions for a specific account
router.get('/transactions/:accountNumber', async (req, res) => {
  console.log(`Fetching transactions for account: ${req.params.accountNumber}`);
  const { accountNumber } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, type, amount, date, balance_after 
      FROM transactions 
      WHERE account_number = $1 
      ORDER BY date DESC`,
      [accountNumber]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
  console.log('Endpoint /transactions hit'); 
  try {
    const result = await pool.query(
      // `SELECT 
      //   transactions.id,
      //   transactions.type,
      //   transactions.amount,
      //   transactions.date,
      //   transactions.account_number,
      //   users.name AS user_name
      //   FROM transactions
      //   JOIN users ON transactions.account_number = users.account_number
      //   ORDER BY date DESC`
      `SELECT id, account_number AS user, amount, type, date 
      FROM transactions 
      ORDER BY date DESC`
    );
    console.log('Transactions fetched:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all transactions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
