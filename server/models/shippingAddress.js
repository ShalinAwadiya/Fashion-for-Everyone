var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaveShippingAddressSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'Missing required value - userId']
    },
    address: {
        firstName: {
            type: String,
            required: [true, 'Missing required value - firstName']
        },
        lastName: {
            type: String,
            required: [true, 'Missing required value - lastName']
        },
        address1: {
            type: String,
            required: [true, 'Missing required value - address1']
        },
        city: {
            type: String,
            required: [true, 'Missing required value - city']
        },
        state: {
            type: String,
            required: [true, 'Missing required value - state']
        },
        zip: {
            type: String,
            required: [true, 'Missing required value - zip']
        },
        country: {
            type: String,
            required: [true, 'Missing required value - country']
        }
    }
});

var shippingModel = mongoose.model('shippingAddress', SaveShippingAddressSchema);

module.exports = shippingModel;