//Minal Rameshchandra Khona - B00873733
var express = require('express');
const { postCoupon, getCoupons, deleteCoupon, filterCoupons, saveCoupon, getSavedCouponsForUser, removeSavedCoupon, addToCart } = require('../controllers/couponController');
var router = express.Router();

router.post('/post-coupon', postCoupon);
router.get('/', getCoupons);
router.delete('/delete/:id', deleteCoupon);
router.get('/filter', filterCoupons);
router.post('/save-coupon', saveCoupon);
router.get('/saved/:userId', getSavedCouponsForUser);
router.put('/unsave/:userId', removeSavedCoupon);
router.post('/add-cart', addToCart);

module.exports = router;