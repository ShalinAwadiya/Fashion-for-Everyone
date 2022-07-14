var express = require('express');
const { postCart, getCart, removeProduct } = require('../controllers/cartController');
var router = express.Router();

router.post('/post-cart', postCart);
router.post('/get-cart',getCart)
router.delete('/remove-item',removeProduct)

module.exports = router;