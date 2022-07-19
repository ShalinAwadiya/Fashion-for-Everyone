//Shathish Annamalai (B00886546)
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    productId:{
        type: String
    },
    reviewMessage:{
        type:String
    },
    reviewScore:{
        type: Number
    }
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
