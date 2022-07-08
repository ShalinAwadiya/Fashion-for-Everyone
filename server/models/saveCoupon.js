//Minal Rameshchandra Khona - B00873733
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaveCouponSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'Missing required value - userId']
    },
    coupons: [
        {
            code: {
                type: String,
                required: [true, 'Missing required value - code']
            },
            discount: {
                type: Number,
                required: [true, 'Missing required value - discount']
            },
            minCartPrice: {
                type: Number,
                required: [true, 'Missing required value - minCartPrice']
            },
            expiryDate: {
                type: String,
                required: [true, 'Missing required value - expiryDate']
            },
            message: {
                type: String,
                required: [true, 'Missing required value - message']
            },
            image: {
                type: String,
                required: [true, 'Missing required value - image']
            }
        }
    ]
});

var SaveCouponModel = mongoose.model('SaveCoupon', SaveCouponSchema);

module.exports = SaveCouponModel;