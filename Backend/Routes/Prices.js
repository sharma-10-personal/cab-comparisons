const express = require('express');
const { pricesFromCab } = require('../Controllers/PriceController');

const router = express.Router();

router.get('/get-fares', pricesFromCab );


module.exports = router;