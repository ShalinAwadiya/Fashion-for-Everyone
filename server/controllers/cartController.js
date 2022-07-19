const express = require("express");
const CartModel = require("../models/cart");
var mongoose = require("mongoose");

/**
 * This function applies to post the products into the cart and post the coupons from coupon page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function postCart(req, res, next) {
  try {
    let user = req.user.user_id;
    const cart = await CartModel.findOne({ userId: user });
    let product = req.body.products;
    let coupon = req.body.coupon;
    if (product) {
      var product_id = product._id;
      var name = product.name;
      var price = product.price;
      var imageUrl = product.imageUrl;
      var quantity = 1;
    }

    if (cart) {
      if (product) {
        cart.products.push({ product_id, name, price, imageUrl, quantity });
      } else if (coupon) {
        cart.coupon = coupon;
      }
      await cart.save();
    } else {
      if (product) {
        await CartModel.create({
          userId: user,
          products: [{ product_id, name, price, imageUrl, quantity }],
        });
      } else if (coupon) {
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
 * This function applies to get the products from the cart when a user is logged in
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function getCart(req, res, next) {
  try {
    let user = req.user.user_id;
    const cart = await CartModel.findOne({ userId: user });
    if (cart) {
      return res.status(200).send({ cart: cart });
    }
    return res.status(200).send({ cart: {
      products:[],
      coupon:{
        code:"-",
        minCartPrice: 0
      }
    } });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function applies after post payment feature to remove the entry from the cart table
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function deleteCart(req, res, next) {
  try {
    let user = req.user.user_id;
    const cart = await CartModel.findOne({ userId: user });
    if (cart) {
      await cart.delete();
    }

    return res.status(200).send({ cart: [] });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function applies to  the products from the cart.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function removeProduct(req, res, next) {
  try {
    let user = req.user.user_id;
    const cart = await CartModel.findOneAndUpdate(
      { userId: user },
      {
        $pull: {
          products: { product_id: mongoose.Types.ObjectId(req.body.productId) },
        },
      },
      { new: true }
    );
    // await cart.save();
    return res.status(200).send({ cart: cart });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function applies to removeCoupon if user doesn't require it
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function removeCoupon(req, res, next) {
  try {
    let user_id = req.user.user_id;
    const cart = await CartModel.findOne({ userId: user_id });
    if (cart) {
      cart.coupon.code = "-";
      cart.coupon.minCartPrice=0
      await cart.save();
      return res.status(200).send({ cart: cart });
    }
  } catch (err) {
    return next(err);
  }
}

/**
 * This function applies to update the quanity of the products into the cart.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function updateQuantity(req, res, next) {
  try {
    let user = req.user.user_id;
    let index = req.body.index;
    let type = req.body.type;
    var cart = await CartModel.findOneAndUpdate({ userId: user });
    if (type === "inc") {
      cart.products[index].quantity += 1;
    } else if(type==="dec"){
      cart.products[index].quantity=cart.products[index].quantity-1;
      if(cart.products[index].quantity===0){
        const cart_remove = await CartModel.findOneAndUpdate(
          { userId: user },
          {
            $pull: {
              products: { product_id: cart.products[index].product_id },
            },
          },
          { new: true }
        )
        return res.status(200).send({ cart: cart_remove.products });


      }
    }
    await cart.save();
    return res.status(200).send({ cart: cart.products });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  postCart,
  getCart,
  removeProduct,
  removeCoupon,
  deleteCart,
  updateQuantity,
};
