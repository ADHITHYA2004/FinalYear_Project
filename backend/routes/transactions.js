const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Replace with your PostgreSQL pool configuration

// Get transactions for a specific account
router.get('/api/transactions/:accountNumber', async (req, res) => {
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

module.exports = router;
