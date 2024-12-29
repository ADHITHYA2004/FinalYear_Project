const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Adjust the path if needed

// Get user details by account number
router.get('/user-details/:accountNumber', async (req, res) => {
    const { accountNumber } = req.params;

    try {
        const result = await pool.query(
            `SELECT account_number, account_holder_name AS name, ifsc, branch, balance
            FROM userdetails
            WHERE account_number = $1`,
            [accountNumber]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
