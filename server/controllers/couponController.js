//Minal Rameshchandra Khona - B00873733
const { validationResult } = require("express-validator");
const CouponModel = require("../models/coupon");

async function postCoupon(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { code } = req.body;

        //Check if the coupon with code req.body.code already exists in the database
        const coupon = await CouponModel.find({ code });
        if (coupon.length) {
            return res.status(409).send({ message: 'Coupon already exists' });
        } else {
            await CouponModel.create(req.body);
            return res.status(201).send({ message: 'Coupon Posted Successfully' })
        }
    } catch (err) {
        return res.status(400).json({
            error: err.name,
            message: err.message.split(':')[2].trim()
        });
    }
}

async function getCoupons(req, res, next) {
    try {
        let coupons = await CouponModel.find();
        return res.status(201).send({ coupons })
    } catch (err) {
        return next(err);
    }
}

async function deleteCoupon(req, res, next) {
    try {
        const _id = req.params.id;
        const coupon = await CouponModel.find({ _id });

        //Check whether the coupon with code req.params.id exists in the database
        if (!coupon) {
            return res.status(204).send({ message: 'Coupon does not exist' });
        } else {
            await CouponModel.deleteOne({ _id })
        }
        return res.status(200).send({ message: 'Coupon delete successfully' })
    } catch (err) {
        return next(err);
    }
}

async function deleteCoupon(req, res, next) {
    try {
        const _id = req.params.id;
        const coupon = await CouponModel.find({ _id });

        //Check whether the coupon with code req.params.id exists in the database
        if (!coupon) {
            return res.status(204).send({ message: 'Coupon does not exist' });
        } else {
            await CouponModel.deleteOne({ _id })
        }
        return res.status(200).send({ message: 'Coupon delete successfully' })
    } catch (err) {
        return next(err);
    }
}

async function filterCoupons(req, res, next) {
    try {
        let condition = [];

        const discount = req.query.discount;
        if (discount) {
            const minDiscount = parseInt(discount.substring(0, 2));
            const maxDiscount = parseInt(discount.substring(2));
            condition.push({ discount: { $gte: minDiscount } })
            condition.push({ discount: { $lte: maxDiscount } })
        }

        const minCartPrice = parseInt(req.query.minCartPrice);
        const maxCartPrice = parseInt(req.query.maxCartPrice);

        if (minCartPrice && maxCartPrice) {
            if (minCartPrice >= maxCartPrice) {
                return res.status(400).send({ message: 'minCartPrice should be less than maxCartPrice' })
            }
        }
        if (minCartPrice) {
            condition.push({ minCartPrice: { $gte: minCartPrice } })
        }

        if (maxCartPrice) {
            condition.push({ minCartPrice: { $lte: maxCartPrice } })
        }

        let coupons;
        console.log(condition)
        coupons = await CouponModel.find({ $and: condition })
        return res.status(200).send({ coupons })
    } catch (err) {
        return next(err);
    }
}

module.exports = { postCoupon, getCoupons, deleteCoupon, filterCoupons }