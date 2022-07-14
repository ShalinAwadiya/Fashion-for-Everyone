const express = require("express");
const CartModel = require("../models/cart");

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
    if(product){

        const product_id = product._id;
        const name = product.name;
        const price = product.price;
        const imageUrl = product.imageUrl;
    }
   
    if (cart) {
      if (product) {
        cart.products.push({ product_id, name, price, imageUrl });
      }

      if (coupon) {
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
      if (coupon) {
       await CartModel.create({
          userId: user,
          products: [{ product_id, name, price, imageUrl }],
        });
      }
    }
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return next(err);
  }
}

async function getCart(req, res, next) {
    try {
      let user = req.body.userId;
      const cart = await CartModel.findOne({ userId: user });
      if (cart) {
        
            return res.status(200).send({"cart":cart });
        
    }
      return res.status(200).send({ "cart":[]});
    } catch (err) {
      return next(err);
    }
  }

  async function deleteCheckout(req, res, next) {
    try {
      let user = req.body.userId;
      const cart = await CartModel.findOne({ userId: user });
      if (cart) {
        
            return res.status(200).send({"cart":cart });
        
    }
      return res.status(200).send({ "cart":[]});
    } catch (err) {
      return next(err);
    }
  }

  async function removeProduct(req, res, next) {
    try {
      let user = req.body.userId;
      let product_id = req.body.productId
      const cart = await CartModel.findOne({ userId: user });
      if (cart) {
        const itemIndex = cart.products.findIndex(item => item.product_id == product_id);
        cart.items.splice(itemIndex, 1);
        await cart.save()
        return res.status(200).send({"cart":cart });
        
    }
      return res.status(200).send({ "cart":[]});
    } catch (err) {
      return next(err);
    }
  }



module.exports = { postCart,getCart, removeProduct};
