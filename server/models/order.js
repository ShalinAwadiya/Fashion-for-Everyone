//Pooja Narendra Anandani  - B00911392
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

var OrderSchema = new Schema({
  userId: {
    type: String
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
      imageUrl: String,
      quantity: Number
    },
  ],
  total_amount: Number,
  is_cancelled: Boolean,
  is_delivered: Boolean,
  order_date: Date

});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
