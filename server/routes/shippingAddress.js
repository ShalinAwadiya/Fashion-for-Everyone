var express = require('express');
const { postShippingAddress } = require('../controllers/shippingAddressController');
var router = express.Router();

console.log("Shipper")
router.post('/checkout', postShippingAddress);

module.exports = router;