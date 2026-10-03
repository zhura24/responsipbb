require('dotenv').config();
const express = require('express');
const loansRouter = require('./routes/loans');

const app = express();
app.use(express.json());

// Root endpoint for testing deployment
app.get('/', (req, res) => {
  res.json({ message: 'Book Loan API is running successfully!' });
});

app.use('/loans', loansRouter);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
