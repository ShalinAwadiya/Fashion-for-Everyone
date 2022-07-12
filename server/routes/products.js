var express = require('express');
const {
  addProduct,
  getProducts,
  getProduct,
  removeProduct,
} = require('../controllers/productController');
var router = express.Router();

router.post('/add-product', addProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);
router.delete('/delete/:productId', removeProduct);

module.exports = router;
