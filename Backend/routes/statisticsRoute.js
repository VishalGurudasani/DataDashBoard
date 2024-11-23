const express = require('express');
const router = express.Router();
const statistics = require('../Controllers/Statistics');

router.get('/', statistics.getStatistics);

module.exports = router;
