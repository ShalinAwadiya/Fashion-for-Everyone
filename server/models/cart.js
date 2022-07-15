//Pooja Narendra Anandani  - B00911392
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NO_RATINGS = 0;
const RATINGS = [NO_RATINGS, 1, 2, 3, 4, 5];
const KIDS = 0,
  WOMEN = 1,
  MEN = 2;
const CATEGORIES = [KIDS, WOMEN, MEN];

var CartSchema = new Schema({
  userId: {
    type: String,
    required: [true, "Missing required value - userId"],
  },
  products: [
    {
      name: { type: String, required: [true, "Missing required value - name"] },
      category: { type: Number, enum: CATEGORIES },
      rating: { type: Number, default: NO_RATINGS, enum: RATINGS },
      brand: {
        type: String,
        required: [true, "Missing required value - brand"],
      },
      price: {
        type: Number,
        required: [true, "Missing required value - price"],
      },
      description: String,
      imageUrl: String,
      img: { data: Buffer, contentType: String },
    },
  ],
  coupon: {
    code: {
      type: String,
      required: [true, "Missing required value - code"],
    },
    minCartPrice: {
      type: Number,
      required: [true, "Missing required value - minCartPrice"],
    },
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
