var express = require('express');
const { postCoupon, getCoupons, deleteCoupon, filterCoupons } = require('../controllers/couponController');
var router = express.Router();

router.post('/post-coupon', postCoupon);
router.get('/', getCoupons);
router.delete('/delete/:id', deleteCoupon);
router.get('/filter', filterCoupons);

module.exports = router;