const express = require("express");
const CartModel = require("../models/cart");

/**
 * 
 * 
 */
async function postCart(req, res, next) {
  try {
    let user = req.body.UserId;
    let cart = await CartModel.findOne(user).limit();
    if (cart) {
      let products = req.body.products;
      console.log(products);
      // cart.products.push({name,categor,rating,brand,price,img})
    } else {
      console.log(products);
    }

    return res.status(200).send({ message: "Hi this is testing" });
  } catch (err) {
    return next(err);
  }
}

module.exports = { postCart };
