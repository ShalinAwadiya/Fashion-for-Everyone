//Minal Rameshchandra Khona - B00873733
const { validationResult } = require("express-validator");
const CartModel = require("../models/cart");
const CouponModel = require("../models/coupon");
const SaveCouponModel = require("../models/saveCoupon")

/**
 * This function posts a new coupon into the system. This functionality is available to the admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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

/**
 * This function list all the available coupons in the system.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function getCoupons(req, res, next) {
    try {
        let coupons = await CouponModel.find();
        return res.status(200).send({ coupons })
    } catch (err) {
        return next(err);
    }
}

/**
 * This function deletes the coupon from the system. This functionality is available to the admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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

/**
 * This function applies filters to the coupons. This functionality can be used by both admin and the users.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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

/**
 * This function saves the coupon for a user
 * @param {*} req {userId, {coupon}}
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function saveCoupon(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId } = req.body;
        const { coupon } = req.body;

        //Get saved coupons for the user using userId
        const savedCoupons = await SaveCouponModel.findOne({ userId });

        if (savedCoupons) {
            //Check if the coupon is already saved
            for (const item of savedCoupons.coupons) {
                if (item.code === coupon.code) {
                    return res.status(409).send({ message: 'Coupon already saved' })
                }
            }
            savedCoupons.coupons.push(coupon);
            await SaveCouponModel.updateOne({ userId: userId }, { coupons: savedCoupons.coupons });
            return res.status(200).send({ message: 'Coupon Saved successfully' });
        } else {
            let couponArr = [];
            couponArr.push(coupon);

            const newRecord = {
                userId: userId,
                coupons: couponArr
            }
            await SaveCouponModel.create(newRecord);
            return res.status(201).send({ message: 'Coupon Saved Successfully' })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: err.name,
            message: err.message.split(':')[2]
        });
    }
}

/**
 * This function fetches the saved coupons for a user using userId.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function getSavedCouponsForUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const savedCoupons = await SaveCouponModel.findOne({ userId });
    if (savedCoupons) {
        return res.status(200).send(savedCoupons);
    } else {
        return res.status(404).send({ message: 'No Coupons found' });
    }
}

/**
 * This function removes coupons from the saved list of a user.
 * @param {*} req {couponCode}
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function removeSavedCoupon(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const couponCode = req.body.couponCode;
    console.log(couponCode)

    const savedCoupons = await SaveCouponModel.findOne({ userId });
    if (savedCoupons) {
        let updatedCouponsList = savedCoupons.coupons.filter(item => item.code !== couponCode)
        savedCoupons.coupons = updatedCouponsList;

        await SaveCouponModel.updateOne({ userId: userId }, { coupons: updatedCouponsList });

        return res.status(200).send(savedCoupons);
    } else {
        return res.status(404).send({ message: 'No Saved Coupons found' });
    }
}

/**
 * This function adds the coupon to the cart
 * @param {*} req {couponCode}
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function addToCart(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body;
    console.log({ userId });

    const { coupon } = req.body;
    console.log(coupon)
    try {
        const userCart = await CartModel.findOne({ userId });
        if (userCart) {
            console.log({ userCart })
            await CartModel.updateOne({ userId: userId }, { coupon });
        } else {
            await CartModel.create(req.body);
        }
        return res.status(200).send({ message: 'Coupon added to cart successfully' });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    postCoupon,
    getCoupons,
    deleteCoupon,
    filterCoupons,
    saveCoupon,
    getSavedCouponsForUser,
    removeSavedCoupon,
    addToCart
}