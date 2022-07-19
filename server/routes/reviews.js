var express = require('express');
const{
    addReview,
    getReviewsOfProducts,
    updateReview,
    removeReview
} = require("../controllers/ReviewControllers")
var router = express.Router();

router.post('/add-review', addReview);
router.get('/:product_id', getReviewsOfProducts);
router.delete('/delete/:review_id', removeReview);
router.put('/update/:review_id', updateReview);

module.exports = router;