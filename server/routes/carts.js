var express = require('express');
const { postCart } = require('../controllers/cartController');
var router = express.Router();

router.post('/post-cart', postCart);

module.exports = router;