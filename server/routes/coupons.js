var express = require('express');
const { postCoupon, getCoupons, deleteCoupon } = require('../controllers/couponController');
var router = express.Router();

router.post('/post-coupon', postCoupon);
router.get('/', getCoupons);
router.delete('/delete/:id', deleteCoupon);

module.exports = router;