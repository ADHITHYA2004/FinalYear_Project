const express = require('express');
const cors = require('cors');
const ocrRoutes = require('./routes/ocrRoutes');

const authRoute = require('./routes/auth'); // Import the auth route

const transactionsRoute = require('./routes/transactions'); // Adjust the path as necessary
// app.use(express.json());

const app = express();
app.use(cors());

app.use(express.json());
app.use(transactionsRoute);
app.use(authRoute);
// Register OCR routes
app.use('/api/ocr', ocrRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
