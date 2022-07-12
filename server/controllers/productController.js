const { validationResult } = require('express-validator');
const ProductModel = require('../models/product');

/**
 * This function add product.
 */
async function addProduct(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await ProductModel.create(req.body);

    return res.status(201).send({ message: 'product added successfully' });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function return product by productId.
 */
async function getProduct(req, res, next) {
  try {
    const _id = req.params.productId;
    const product = await ProductModel.findOne({ _id });

    if (!product) {
      return res.status(204).send({ message: 'Product does not exist' });
    }
    return res.status(200).send({ product });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function get first 50 available products in the system.
 */
async function getProducts(req, res, next) {
  try {
    let products = await ProductModel.find().limit(50);
    return res.status(200).send({ products });
  } catch (err) {
    return next(err);
  }
}

async function removeProduct(req, res, next) {
  try {
    const _id = req.params.productId;
    const product = await ProductModel.find({ _id });
    console.log(product);
    //Check whether the coupon with code req.params.id exists in the database
    if (!product.length) {
      return res.status(204).send({ message: 'Product does not exist' });
    } else {
      await ProductModel.deleteOne({ _id });
    }
    return res.status(200).send({ message: 'Product delete successfully' });
  } catch (err) {
    return next(err);
  }
}

module.exports = { addProduct, getProduct, getProducts, removeProduct };
