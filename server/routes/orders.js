// Pooja Anandani-B00911392
var express = require('express');
const { postOrder, getOrder, updateOrder } = require('../controllers/orderController.js');
var router = express.Router();

router.post('/post_order', postOrder);
router.get('',getOrder)
router.post('/update_order',updateOrder)

module.exports = router;