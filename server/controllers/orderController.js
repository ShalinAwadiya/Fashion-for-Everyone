const OrderModel = require("../models/order");
var mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { locales } = require("validator/lib/isFloat");
/**
 * This function applies to post the products into the cart and post the coupons from coupon page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 async function postOrder(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
      let user =req.user.user_id;
      const total_amount = req.body.total_amount
      const order_date = req.body.order_date
      let product = req.body.products;
      await OrderModel.create({
        userId: user,
        products: product,
        total_amount: total_amount,
        order_date: order_date,
        is_cancelled: false,
        is_delivered: false,

      })
    res.status(201).send({message:"Order Created"})
    } catch (err) {
      return next(err);
    }
}

/**
 * This function applies to get the products from the cart when a user is logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 async function getOrder(req, res, next) {
    try {
      let user = req.user.user_id;
      const order = await OrderModel.find({ userId: user });
      if (order) {
        return res.status(200).send({ order: order});
      }
      return res.status(200).send({ order: order });
    } catch (err) {
      return next(err);
    }
  }

/**
 * This function applies to get the products from the cart when a user is logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

 async function updateOrder(req, res, next) {
    try {
      let user = req.user.user_id;
      const order = await OrderModel.findOne({ _id:mongoose.Types.ObjectId(req.body.order_id),userId:user});
      order.is_cancelled=true
      order.is_delivered=true
      await order.save()
      return res.status(200).send({ order: order});
      
    } catch (err) {
      return next(err);
    }
  }
  module.exports = {
    postOrder,
    getOrder,
    updateOrder
  };
  