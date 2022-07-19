//Minal Rameshchandra Khona - B00873733
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    blogId: {
        type: String,
        required: [true, 'Missing required value - blogId']
    },
    userId: {
        type: String,
        required: [true, 'Missing required value - userId']
    },
    name: {
        type: String,
        required: [true, 'Missing required value - name']
    },
    caption: {
        type: String,
        required: false
    },
    image: [
        {
            type: String,
            required: false
        }
    ],
    products: [
        {
            id: {
                type: Number,
                required: false
            },
            ProductType: {
                type: String,
                required: false
            },
            ProductLink: {
                type: String,
                required: false
            }
        }
    ]
});

var BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;