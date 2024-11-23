const express = require('express');
const router = express.Router();
const barChart = require('../Controllers/barchart');

router.get('/', barChart.getBarChart);

module.exports = router;
