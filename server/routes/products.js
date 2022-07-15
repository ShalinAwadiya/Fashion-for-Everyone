var express = require('express');
const {
  addProduct,
  getProducts,
  getProduct,
  removeProduct,
  updateProduct,
} = require('../controllers/productController');
var router = express.Router();

router.post('/add-product', addProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);
router.delete('/delete/:productId', removeProduct);
router.put('/update/:productId', updateProduct);

module.exports = router;
