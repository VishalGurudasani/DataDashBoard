const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoute');
const statisticsRoutes = require('./routes/statisticsRoute');
const barChartRoutes = require('./routes/barchartRoute');
const pieChartRoutes = require('./routes/piechartRoute');
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/bar-chart', barChartRoutes);
app.use('/api/pie-chart', pieChartRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/transactionDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
