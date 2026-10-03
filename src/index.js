// src/index.js
require('dotenv').config();
const express = require('express');
const loansRouter = require('./routes/loans');

const app = express();
app.use(express.json());
app.use('/loans', loansRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
