const express = require('express');
const router = express.Router();

const mockAdminCredentials = {
  username: 'admin',
  password: 'admin123', // You can replace this with a secure password
};

// Authentication endpoint
router.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;

  if (username === mockAdminCredentials.username && password === mockAdminCredentials.password) {
    const token = 'dummy-jwt-token'; 
    return res.json({ success: true, message: 'Authentication successful' });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();

// const mockAdminCredentials = {
//   username: 'admin',
//   password: 'admin123',
// };

// // Authentication endpoint
// router.post('/api/authenticate', (req, res) => {
//   const { username, password } = req.body || {}; // Fallback to an empty object if req.body is undefined

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'Username and password are required' });
//   }

//   if (username === mockAdminCredentials.username && password === mockAdminCredentials.password) {
    
//     return res.json({ success: true, message: 'Authentication successful' });
//   }

//   res.status(401).json({ success: false, message: 'Invalid credentials' });
// });

// module.exports = router;
