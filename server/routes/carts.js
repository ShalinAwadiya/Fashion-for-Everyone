var express = require('express');
const { postCart, getCart, removeProduct, removeCoupon, deleteCart } = require('../controllers/cartController');
var router = express.Router();

router.post('/post_cart', postCart);
router.get('/get_cart',getCart)
router.delete('/remove_item',removeProduct)
router.post('/remove_coupon',removeCoupon)
router.delete('/remove_cart',deleteCart)

module.exports = router;