// Pooja Anandani-B00911392
var express = require('express');
const { postCart, getCart, removeProduct, removeCoupon, deleteCart, updateQuantity } = require('../controllers/cartController');
var router = express.Router();

router.post('/post_cart', postCart);
router.get('',getCart)
router.delete('/remove_item',removeProduct)
router.delete('/remove_coupon',removeCoupon)
router.delete('/remove_cart',deleteCart)
router.post('/update_quantity',updateQuantity)

module.exports = router;