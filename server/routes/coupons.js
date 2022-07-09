var express = require('express');
const { postCoupon, getCoupons, deleteCoupon, filterCoupons, saveCoupon, getSavedCouponsForUser, removeSavedCoupon } = require('../controllers/couponController');
var router = express.Router();

router.post('/post-coupon', postCoupon);
router.get('/', getCoupons);
router.delete('/delete/:id', deleteCoupon);
router.get('/filter', filterCoupons);
router.post('/save-coupon', saveCoupon);
router.get('/saved/:userId', getSavedCouponsForUser);
router.put('/unsave/:userId', removeSavedCoupon);

module.exports = router;