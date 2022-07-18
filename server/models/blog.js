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
        required: [true, 'Missing required value - caption']
    },
    image: [
        {
            type: String,
            required: [true, 'Missing required value - image']
        }
    ],
    products: [
        {
            Type: {
                type: String,
                required: [true, 'Missing required value - product type']
            },
            Link: {
                type: String,
                required: [true, 'Missing required value - product link']
            }
        }
    ]
});

var BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;