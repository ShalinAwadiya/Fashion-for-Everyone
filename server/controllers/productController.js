//Author: Manan Amin (B00897712)

const { validationResult } = require('express-validator');
const ProductModel = require('../models/product');
const awsConfig = require('../config/aws-config');

/**
 * This function add product.
 * usage: POST /products/add-product
 */
async function addProduct(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.img) {
      const url = await awsConfig.saveImage(req.body.img);
      req.body.imageUrl = url;
    }

    await ProductModel.create(req.body);

    return res.status(201).send({ message: 'product added successfully' });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function return product by productId.
 * usage: GET /products/productId
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
 * usage: GET /products
 */
async function getProducts(req, res, next) {
  try {
    let products = await ProductModel.find().limit(50);
    return res.status(200).send({ products });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function delete product by name.
 * usage: DELETE /products/delete/:productId
 */
async function removeProduct(req, res, next) {
  try {
    const _id = req.params.productId;
    const product = await ProductModel.find({ _id });
    if (!product.length) {
      return res.status(204).send({ message: 'Product does not exist' });
    } else {
      await ProductModel.deleteOne({ _id });
      product[0].RemoveFromAlgolia();
    }
    return res.status(200).send({ message: 'Product delete successfully' });
  } catch (err) {
    return next(err);
  }
}

/**
 * This function updates product by id.
 * usage: update /products/update/:productId
 */
async function updateProduct(req, res, next) {
  try {
    const _id = req.params.productId;
    const product = await ProductModel.find({ _id });
    if (!product.length) {
      return res.status(204).send({ message: 'Product does not exist' });
    } else {
      if (req.body.img) {
        const url = await awsConfig.saveImage(req.body.img);
        req.body.imageUrl = url;
      }

      await ProductModel.findByIdAndUpdate(req.body._id, req.body);
    }
    return res.status(200).send({ message: 'Product updated successfully' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
};
