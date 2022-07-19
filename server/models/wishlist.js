// Shalin Hasanbhai Awadiya - B00892907
const mongoose = require("mongoose");

// The below mentioned schema specifies the mongoDB collection and document details for wishlist management.

const wishlistSchema = new mongoose.Schema({
  wishlistId: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  _id: {
    type: String,
    required: false,
  },

  name: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

module.exports = WishlistModel;
