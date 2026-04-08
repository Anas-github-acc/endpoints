const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/', schoolRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

module.exports = app;
