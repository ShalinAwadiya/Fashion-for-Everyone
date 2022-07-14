const express = require("express");
const CartModel = require("../models/cart");
var mongoose = require("mongoose");

/**
 *
 *
 */
async function postCart(req, res, next) {
  try {
    let user = req.body.userId;
    const cart = await CartModel.findOne({ userId: user });
    let product = req.body.products;
    let coupon = req.body.coupon;
    if (product) {
      var product_id = product._id;
      var name = product.name;
      var price = product.price;
      var imageUrl = product.imageUrl;
    }

    if (cart) {
      if (product) {
        cart.products.push({ product_id, name, price, imageUrl });
      }

      else if (coupon) {
        cart.coupon = coupon;
      }
      await cart.save();
    } else {
      if (product) {
        await CartModel.create({
          userId: user,
          products: [{ product_id, name, price, imageUrl }],
        });
      }
      else if (coupon) {
        await CartModel.create({
          userId: user,
          coupon: coupon,
        });
      }
    }
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return next(err);
  }
}

/**
 *
 *
 */
async function getCart(req, res, next) {
  try {
    console.log(req.user);
    // let user = req.user
    // const cart = await CartModel.findOne({ userId: user });
    // if (cart) {
    //   return res.status(200).send({ cart: cart });
    // }
    return res.status(200).send({ cart: [] });
  } catch (err) {
    return next(err);
  }
}

/**
 *
 *
 */
async function deleteCart(req, res, next) {
  try {
    let user = req.body.userId;
    const cart = await CartModel.findOne({ userId: user });
    if(cart){
      await cart.delete();
    }
    
    return res.status(200).send({ cart: [] });
  } catch (err) {
    return next(err);
  }
}

/**
 *
 *
 */
async function removeProduct(req, res, next) {
  try {
    let user = req.body.userId;
    const cart = await CartModel.findOneAndUpdate(
      { userId: user },
      {
        $pull: {
          products: { product_id: mongoose.Types.ObjectId(req.body.productId) },
        },
      }
    );

    await cart.save();
    return res.status(200).send({ cart: cart });
  } catch (err) {
    return next(err);
  }
}

/**
 *
 *
 */
async function removeCoupon(req, res, next) {
  try {
    let user_id = req.body.userId;
    const cart = await CartModel.findOne({ userId: user_id });
    if (cart) {
      cart.coupon = null;
      await cart.save();
      return res.status(200).send({ cart: cart });
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = { postCart, getCart, removeProduct, removeCoupon, deleteCart };
