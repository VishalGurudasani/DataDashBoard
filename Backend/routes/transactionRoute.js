const express = require('express');
const router = express.Router();
const transaction = require('../Controllers/transactions');

router.get('/', transaction.getTransactions);

module.exports = router;
