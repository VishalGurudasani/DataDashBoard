const express = require('express');
const router = express.Router();
const piechart = require('../Controllers/piechart');

router.get('/', piechart.getPieChart);

module.exports = router;
