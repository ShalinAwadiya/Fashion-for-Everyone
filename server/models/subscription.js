//Rishika Bajaj -B00902713
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscribedUsersSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Missing required value - userId']
    },
});

var subscriptionModel = mongoose.model('subscriptions', subscribedUsersSchema);

module.exports = subscriptionModel;