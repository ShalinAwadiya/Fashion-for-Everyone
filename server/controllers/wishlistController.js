// Shalin Hasanbhai Awadiya - B00892907
const WishlistModel = require("../models/wishlist");

async function addProductToWishlist(request, response, next) {
  try {
    const productToBeAdded = await WishlistModel.create(request.body);
    response
      .status(200)
      .json({ message: "Product Successfully inserted to wishlist" });
  } catch (error) {
    response.status(500).send(error);
  }
}
async function getWishlist(request, response, next) {
  const userId = request.params.userId;
  console.log(userId);

  const products = await WishlistModel.find({
    userId: userId,
  });

  try {
    response.status(200).json({ products: products });
  } catch (error) {
    response.status(500).send(error);
  }
}
async function removeProductFromWishlist(request, response, next) {
  const wishlistId = request.params.wishlistId;
  console.log(wishlistId);

  try {
    await WishlistModel.deleteOne({ wishlistId: wishlistId });
    response.status(200).json({ message: "Wishlist item Removed" });
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
};
