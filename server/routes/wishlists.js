// Shalin Hasanbhai Awadiya - B00892907
var express = require("express");
const {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");
var router = express.Router();

router.post("/user/addProductToWishlist", addProductToWishlist);
router.get("/user/getWishlist/:userId", getWishlist);
router.delete(
  "/user/deleteProductFromWishlist/:wishlistId",
  removeProductFromWishlist
);

module.exports = router;
