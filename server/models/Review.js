//Shathish Annamalai (B00886546)
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

var ReviewSchema = new Schema({
    user:{
        user_id: {
            type: ObjectID,
            required: true,
            ref: "User",
        },
        email: String,
        name: String,
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
