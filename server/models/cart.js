//Pooja Narendra Anandani  - B00911392
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

var CartSchema = new Schema({
  userId: {
    type: ObjectID,
    required: true,
    ref: "User",
  },
  products: [
    {
      product_id: {
        type: ObjectID,
        required: true,
        ref: "Product",
      },
      name: String,
      brand: String,
      price: Number,
      description: String,
      imageUrl: String
    },
  ],
  coupon: {
    code: {
      type: String,
    },
    minCartPrice: {
      type: Number,
    },
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
